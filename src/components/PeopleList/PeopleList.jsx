import { Trash } from 'lucide-react';

function PeopleList({value, onChange}) {
    const {basePeople = [], menuItems = [], setting = {vat: false, serviceCharge: false}} = value || {};

    const toggleVat = () => {
        const s = setting || {vat: false, serviceCharge: false};
        onChange({
            ...value,
            setting: {...s, vat: !s.vat}
        });
    }

    const toggleServiceCharge = () => {
        const s = setting || {vat: false, serviceCharge: false};
        onChange({
            ...value,
            setting: {...s, serviceCharge: !s.serviceCharge}
        });
    }

    const calculateVat = (total) => (setting.vat ? total * 0.07 : 0);
    const calculateService = (total) => (setting.serviceCharge ? total * 0.10 : 0);

    const calculatePricePerPerson = (person) => {
        let total = 0;
        menuItems.forEach((item) => {
            if (item.choosePeople.includes(person)) {
            total += item.price / item.choosePeople.length;
            }
        });

        const vatAmount = calculateVat(total);
        const serviceAmount = calculateService(total);

        const grandTotal = total + vatAmount + serviceAmount;
        return {
            service: serviceAmount.toFixed(2),
            vat: vatAmount.toFixed(2),
            grandTotal: grandTotal.toFixed(2),
        };
    };

    const deletePeople = (index) => {
        const personToDelete = basePeople[index];
        const updatedBasePeople = basePeople.filter((_, i) => i !== index);
        const updatedMenuItems = menuItems.map(item => ({
            ...item,
            choosePeople: item.choosePeople.filter(p => p !== personToDelete)
        }));
        onChange({
            basePeople: updatedBasePeople,
            menuItems: updatedMenuItems,
            setting: setting
        });
    }
    return (
        <>
            <div className='flex gap-2 mb-4'>
                <div className={`flex-1 border rounded-md py-2 cursor-pointer ${setting.vat ? 'bg-green-200' : ''}`} onClick={toggleVat}>Vat 7 %</div>
                <div className={`flex-1 border rounded-md py-2 cursor-pointer ${setting.serviceCharge ? 'bg-green-200' : ''}`} onClick={toggleServiceCharge}>Service Charge 10 %</div>
            </div>
            <div className='flex gap-2 mb-4'>
                <div className='flex-3 text-left'>รายชื่อ</div>
                <div className='flex-1 text-right'>sc</div>
                <div className='flex-1 text-right'>vat</div>
                <div className='flex-2 text-right'>ราคาคนละ</div>
                <div className='w-14'></div>
            </div>
            <div>
                {basePeople.map((person, index) => (
                    <div key={index} className="flex items-center gap-2 mb-1">
                        <div className='flex-3 text-left'>{person}</div>
                        <div className='flex-1 text-right'>{calculatePricePerPerson(person).service}</div>
                        <div className='flex-1 text-right'>{calculatePricePerPerson(person).vat}</div>
                        <div className='flex-2 text-center bg-green-200 py-1 rounded-2xl'>
                            {calculatePricePerPerson(person).grandTotal }
                        </div>
                        <button className='px-4 py-3 rounded-md flex items-center bg-red-100 hover:bg-red-200 cursor-pointer' onClick={() => deletePeople(index)}><Trash className='w-4 h-4'/></button>
                    </div>
                ))}
            </div>        
        </>
    )
}

export default PeopleList