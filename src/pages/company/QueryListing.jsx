import {useState, useEffect, useRef} from 'react';
import UserHomeLayout from "../../layout/UserHomeLayout";
import Pitch from "./components/Pitch";
import useSwr from "swr";
import Loading from "../../components/Loading";
import {motion, AnimatePresence} from "framer-motion";
import {useIonViewWillLeave, IonRefresher, IonRefresherContent} from "@ionic/react";
import {useAtom} from "jotai";
import {audioAtom} from "../../state";

const useReverseGeocoding = (latitude, longitude) => {
    const [location, setLocation] = useState({city: '', country: ''});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!latitude || !longitude) {
            setLocation({city: '', country: ''});
            setError(null);
            return;
        }

        const fetchLocation = async () => {
            setLoading(true);
            setError(null);
            const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

            try {
                const response = await fetch(url, {
                    headers: {
                        'Accept-Language': 'en', 'User-Agent': 'YourAppName/1.0 (contact@example.com)',
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (data && data.address) {
                    const city = data.address.city || data.address.town || data.address.village || 'Unknown City';
                    const country = data.address.country || 'Unknown Country';
                    setLocation({city, country});
                } else {
                    setLocation({city: 'Not found', country: 'Not found'});
                }
            } catch (e) {
                console.error("Failed to fetch reverse geocoding data:", e);
                setError('Failed to retrieve location data.');
                setLocation({city: '', country: ''});
            } finally {
                setLoading(false);
            }
        };

        fetchLocation();
    }, [latitude, longitude]);

    return {location, loading, error};
};


const PitchItem = ({item, index, focusedIndex, setFocusedIndex, queryRef}) => {

    const lat = 31.394679711235813
    const lon = 74.26259638580137

    const {location, loading, error} = useReverseGeocoding(lat, lon);

    let displayLocation = "Loading...";
    if (error) {
        displayLocation = "Could not find location";
    } else if (!loading && location.city && location.city !== 'Not found') {
        displayLocation = `${location.country}`;
    } else if (!loading) {
        displayLocation = "Location not available";
    }

    return (<Pitch
        location={displayLocation}
        area={item.category}
        index={index}
        focus={index === focusedIndex}
        setFocusedIndex={setFocusedIndex}
        url={item.userMessageLink}
        jobId={item.jobId}
        queryRef={queryRef}
    />);
};


// --- Main Component (Corrected) ---
function QueryListing() {
    const {data, isLoading,mutate} = useSwr("job-notifications?page=1");
    const queryRef = useRef();
    const [focusedIndex, setFocusedIndex] = useState(0);
    const [_, setAudioState] = useAtom(audioAtom);

    useIonViewWillLeave(() => {
        console.log("leaving.........");
        if (queryRef.current) {
            queryRef.current.pause();
            queryRef.current = null;
        }
        setAudioState({
            isPaused: false, isPlaying: false, url: null,
        });
    });


    function handleRefresh(event) {
        mutate().finally(() => {
            event.detail.complete();
        });
    }

    return (
        <UserHomeLayout>
            <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                <IonRefresherContent></IonRefresherContent>
            </IonRefresher>
        {isLoading ? (<Loading open={isLoading} message={"Fetching jobs"} />) : data && data.data.length === 0 ? (
            <div className="h-full flex flex-col gap-8 items-center justify-center">
                <img src="/empty-notifications.svg" alt="No notifications" className="w-56 h-56 " />
                <div className="capitalize">No Leads available at the moment!</div>
            </div>) : (<motion.div
            layout
            transition={{
                layout: {duration: 0.3},
            }}
            className="flex flex-col items-center h-full justify-end gap-6 my-6"
        >
            <AnimatePresence initial={false}>
                {data && data.data.map((item, index) => (<PitchItem
                    key={item.id}
                    item={item}
                    index={index}
                    focusedIndex={focusedIndex}
                    setFocusedIndex={setFocusedIndex}
                    queryRef={queryRef}
                />))}
            </AnimatePresence>
        </motion.div>)}
    </UserHomeLayout>);
}

export default QueryListing;
