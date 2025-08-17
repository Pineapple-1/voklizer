import {useRef, useState, useEffect} from 'react';
import {
    IonButton,
    IonModal,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonCheckbox,
} from '@ionic/react';


function PracticeAreaModal({
                               items = [],
                               selectedItems = [],
                               onSelectionChange = () => {
                               },
                               placeholder = "Select practice areas...",
                               searchPlaceholder = "Search practice areas..."
                           }) {
    const modal = useRef();
    const [searchText, setSearchText] = useState('');
    const [selected, setSelected] = useState(new Set(selectedItems));

    useEffect(() => {
        setSelected(new Set(selectedItems));
    }, [selectedItems]);


    const filteredItems = items.filter((area) =>
        area.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleSelectionToggle = (area) => {
        const newSelection = new Set(selected);
        if (newSelection.has(area)) {
            newSelection.delete(area);
        } else {
            newSelection.add(area);
        }
        setSelected(newSelection);
        onSelectionChange(Array.from(newSelection));
    };

    const getDisplayText = () => {
        if (selectedItems.length === 0) {
            return placeholder;
        }
        if (selectedItems.length === 1) {
            return selectedItems[0];
        }
        return `${selectedItems.length} areas selected`;
    };

    return (
        <>
            <button
                id="practice-area-modal"
                className="w-full text-left justify-start  rounded-md p-3  bg-white border outline outline-1 -outline-offset-1 "
            >
                {getDisplayText()}
            </button>

            <IonModal
                ref={modal}
                trigger="practice-area-modal"
                initialBreakpoint={0.75}
                breakpoints={[0, 0.5, 0.65, 0.75, 1]}
            >
                <IonContent className="ion-padding">
                    <IonList>
                        <input
                            type="text"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            placeholder={searchPlaceholder}
                            className={`w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-purple-500 `}
                        />
                        {filteredItems.length > 0 ? (
                            filteredItems.map((area) => {
                                const isSelected = selected.has(area);
                                return (
                                    <IonItem
                                        key={area}
                                        button
                                        onClick={() => handleSelectionToggle(area)}
                                    >
                                        <IonCheckbox
                                            slot="start"
                                            checked={isSelected}
                                        />
                                        <IonLabel>
                                            <h2 className="capitalize">{area}</h2>
                                        </IonLabel>
                                    </IonItem>
                                );
                            })
                        ) : (
                            <IonItem>
                                <IonLabel>
                                    <p className="text-gray-500">
                                        {searchText ? `No areas found for "${searchText}"` : "No practice areas available"}
                                    </p>
                                </IonLabel>
                            </IonItem>
                        )}
                    </IonList>
                </IonContent>
            </IonModal>
        </>
    );
}

export default PracticeAreaModal;