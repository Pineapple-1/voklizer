import {useRef, useState, useEffect} from 'react';
import {
    IonButton,
    IonModal,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
} from '@ionic/react';
import countries from '../data/countries.json';

function CountryCodeModal({
    selectedCountry = null,
    onSelectionChange = () => {},
    placeholder = "Select country...",
    searchPlaceholder = "Search countries..."
}) {
    const modal = useRef();
    const [searchText, setSearchText] = useState('');

    const filteredCountries = countries.filter((country) =>
        country.name.toLowerCase().includes(searchText.toLowerCase()) ||
        country.code.includes(searchText)
    );

    const handleCountrySelect = (country) => {
        onSelectionChange(country);
        modal.current?.dismiss();
    };

    const getDisplayText = () => {
        if (selectedCountry) {
            return `${selectedCountry.code}`;
        }
        return placeholder;
    };

    return (
        <>
            <button
                type="button"
                id="country-code-modal"
                className="w-full text-left justify-start  py-1.5  text-sm  "
            >
                {getDisplayText()}
            </button>

            <IonModal
                ref={modal}
                trigger="country-code-modal"
                initialBreakpoint={1}
                breakpoints={[0, 1]}
                style={{ '--height': '65vh' }}
            >
                <IonContent className="ion-padding">
                    <input
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder={searchPlaceholder}
                        className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-purple-500 sticky top-0 bg-white z-10"
                    />
                    <div className="h-full overflow-y-auto">
                        <IonList>
                            {filteredCountries.length > 0 ? (
                                filteredCountries.map((country, index) => (
                                <IonItem
                                    key={`${country.name}-${country.code}-${index}`}
                                    button
                                    onClick={() => handleCountrySelect(country)}
                                >
                                    <IonLabel>
                                        <div className="flex items-center gap-3">
                                            <div className='flex items-center   gap-2'>
                                                <h2 className="font-medium">{country.name}</h2>
                                                <p className="text-gray-500">{country.code}</p>
                                            </div>
                                        </div>
                                    </IonLabel>
                                </IonItem>
                            ))
                            ) : (
                                <IonItem>
                                    <IonLabel>
                                        <p className="text-gray-500">
                                            {searchText ? `No countries found for "${searchText}"` : "No countries available"}
                                        </p>
                                    </IonLabel>
                                </IonItem>
                            )}
                        </IonList>
                    </div>
                </IonContent>
            </IonModal>
        </>
    );
}

export default CountryCodeModal;