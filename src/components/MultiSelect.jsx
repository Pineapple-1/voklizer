import {useState, useEffect} from "react";
import {
    Button, Dialog, DialogTrigger, Popover, ListBox, ListBoxItem, SearchField, Input
} from "react-aria-components";
import { ChevronDown } from "lucide-react";

export default function MultiSelectDialog({
                                              items = [],
                                              selectedItems = [],
                                              onSelectionChange = () => {
                                              },
                                          }) {
    const [filter, setFilter] = useState("");
    const [selected, setSelected] = useState(new Set(selectedItems));

    useEffect(() => {
        setSelected(new Set(selectedItems));
    }, [selectedItems]);

    const filteredItems = items.filter((label) => label.toLowerCase().includes(filter.toLowerCase()));

    const handleSelectionChange = (keys) => {
        const newSelection = new Set(keys);
        setSelected(newSelection);
        onSelectionChange(Array.from(newSelection));
    };

    return (<DialogTrigger>
        <Button className='w-full text-left bg-white py-3 px-2 rounded outline outline-gray-300  focus:outline-purple-500 flex items-center justify-between'>
            <span>
                {selected.size > 0 ? (
                    <span className="text-gray-700 capitalize">{Array.from(selected).join(", ")}</span>
                ) : (
                    <span className="text-gray-500">Select items...</span>
                )}
            </span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
        </Button>

        <Popover className="border rounded shadow bg-white p-2" placement={"bottom left"}>
            <Dialog className="outline-none">
                <SearchField
                    value={filter}
                    onChange={setFilter}
                    className="w-full mb-3"
                >
                    <Input
                        placeholder={'Search items...'}
                        className="w-full border rounded px-3 py-2 text-sm placeholder-gray-400 outline-none "
                    />
                </SearchField>

                <ListBox
                    selectionMode="multiple"
                    selectedKeys={selected}
                    onSelectionChange={handleSelectionChange}
                    className="max-h-40 overflow-auto"
                >
                    {filteredItems.map((label) => (<ListBoxItem
                        key={label}
                        id={label}
                        className="cursor-pointer px-2 py-1 hover:bg-gray-100 flex items-center gap-2"
                    >
                        {({isSelected}) => (<>
                            <input type="checkbox" checked={isSelected} readOnly />
                            {label}
                        </>)}
                    </ListBoxItem>))}
                </ListBox>
            </Dialog>
        </Popover>
    </DialogTrigger>);
}
