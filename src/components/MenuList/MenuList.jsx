import { Trash } from 'lucide-react';
import MenuModal from '../MenuModal/MenuModal'
import ChoosePeopleModal from '../ChoosePeopleModal/ChoosePeopleModal';

function MenuList({value, onChange}) {
    // Destructure value with fallbacks to avoid undefined access
    const {basePeople = [], menuItems = [], setting} = value || {};

    const handleDataFromChoosePeopleModal = (index, getData) => {
        // Update chosen people for a specific menu item
        const updatedMenuItems = menuItems.map((item, i) =>
            i === index ? { ...item, choosePeople: getData?.choosePeople || [] } : item
        );

        onChange({
            basePeople: getData?.people ?? basePeople,
            menuItems: updatedMenuItems,
            setting: setting
        });
    };

    const handleDataFromMenuModal = (getData) => {
        // Update the menu list data
        onChange({
            basePeople: getData.people,
            menuItems: [...menuItems, {
                menuName: getData.menuName,
                price: parseFloat(getData.price),
                choosePeople: getData.choosePeople
            }]
        });
    };

    const deleteMenuItem = (index) => {
        const updatedMenuItems = menuItems.filter((_, i) => i !== index);
        onChange({
            basePeople: basePeople,
            menuItems: updatedMenuItems
        });
    };

    return (
        <>
            <div className='flex'>
                <div className='flex-4 text-left'>ชื่อรายการ</div>
                <div className='flex-1 text-right'>ราคา</div>
                <div className='w-28 text-right'></div>
            </div>
            <div>
                {menuItems.map((item, index) => (
                    <div key={index}>
                        <div className="flex items-center gap-2 mb-1">
                            <div className='flex-4 text-left'>{item.menuName}</div>
                            <div className='flex-1 text-right'>{item.price.toFixed(2)}</div>                            
                            <ChoosePeopleModal 
                                sendDataToMenuList={(data) => handleDataFromChoosePeopleModal(index, data)} 
                                getBasePeople={basePeople} 
                                getChoosePeople={item.choosePeople}/>
                            <button className='px-4 py-3 rounded-md flex items-center bg-red-100 hover:bg-red-200 cursor-pointer' onClick={() => deleteMenuItem(index)}><Trash className='w-4 h-4'/></button>
                        </div>
                        <div className='flex gap-2'>
                            {item.choosePeople.map((p, idx) => (
                                <span key={idx} className="badge badge-secondary">{p}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className='border-t-2 border-black mt-2 mb-2 pt-2 pb-2'>
            </div>
            <div className='flex mb-5'>
                <MenuModal sendDataToMenuList={handleDataFromMenuModal} getBasePeople={basePeople}/>
            </div>
            <div className='flex'>
                <button>ลบทั้งหมด</button>
            </div>
        </>
    )
}

export default MenuList