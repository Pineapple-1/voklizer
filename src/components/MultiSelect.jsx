import {useState, useEffect, useRef} from "react";
import { ChevronDown, X } from "lucide-react";

export default function MultiSelectDialog({
                                              items = [],
                                              selectedItems = [],
                                              onSelectionChange = () => {
                                              },
                                              placeholder = "Search and select items..."
                                          }) {
    const [filter, setFilter] = useState("");
    const [selected, setSelected] = useState(new Set(selectedItems));
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        setSelected(new Set(selectedItems));
    }, [selectedItems]);

    const filteredItems = items.filter((label) => 
        label.toLowerCase().includes(filter.toLowerCase())
    );




    const handleInputChange = (e) => {
        setFilter(e.target.value);
        if (!isOpen && e.target.value) {
            setIsOpen(true);
        }
    };

    const handleInputFocus = () => {
        setIsOpen(true);
    };

    const selectedArray = Array.from(selected);

    return (
        <div className="relative w-full">
            {/* Main Input Area */}
            <div className="w-full bg-white border border-gray-300 rounded px-3 py-2 focus-within:border-purple-500 focus-within:outline-none">
                {/* Selected Items Tags */}
                {/* Search Input */}
                <div className="flex items-center justify-between">
                    <input
                        ref={inputRef}
                        type="text"
                        value={filter}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        placeholder={selectedArray.length > 0 ? "Search more items..." : placeholder}
                        className="flex-1 outline-none text-gray-700 placeholder-gray-500"
                    />
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="ml-2 text-gray-400 hover:text-gray-600"
                    >
                        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Dropdown List - Always appears above */}
            {isOpen && (
                <div className="absolute bottom-full left-0 right-0 z-50 mb-1 bg-white border border-gray-300 rounded shadow-lg">
                    <div className="max-h-40 overflow-auto">
                        {filteredItems.length > 0 ? (
                            filteredItems.map((label) => {
                                const isSelected = selected.has(label);
                                return (
                                    <div
                                        key={label}
                                        onClick={() => {
                                            const newSelection = new Set(selected);
                                            if (isSelected) {
                                                newSelection.delete(label);
                                            } else {
                                                newSelection.add(label);
                                            }
                                            setSelected(newSelection);
                                            onSelectionChange(Array.from(newSelection));
                                            setFilter(""); // Clear search after selection
                                        }}
                                        className="cursor-pointer px-3 py-2 hover:bg-gray-100 flex items-center gap-2"
                                    >
                                        <input 
                                            type="checkbox" 
                                            checked={isSelected} 
                                            readOnly 
                                            className="pointer-events-none"
                                        />
                                        <span className="text-sm">{label}</span>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="px-3 py-2 text-gray-500 text-sm">
                                {filter ? `No items found for "${filter}"` : "No items available"}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Backdrop to close dropdown */}
            {isOpen && (
                <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => {
                        setIsOpen(false);
                        setFilter("");
                    }}
                />
            )}
        </div>
    );
}