import { useState, useEffect, useRef } from 'react'

function MenuModal({sendDataToMenuList, getBasePeople}) {
    const [menuName, setMenuName] = useState("");
    const [price, setPrice] = useState("");
    const [people, setPeople] = useState([]);
    const [choosePeople, setChoosePeople] = useState([]);

    const dialogRef = useRef(null);
    const inputRef = useRef(null);
    const openModal = () => {
        dialogRef.current.showModal();
    }

    // Initialize people with getBasePeople when getBasePeople changes
    useEffect(() => {
        setPeople(getBasePeople);
    }, [getBasePeople]);  

    const listPeople = people.map((p) => {
        if (choosePeople.includes(p)) {
            return <span key={p} onClick={() => addChoosePeople(p)} className="badge badge-primary mr-2">{p}</span>
        } else {
            return <button key={p} onClick={() => addChoosePeople(p)} className="badge badge-default mr-2">+ {p}</button>
        }
    });

    const listChoosePeople = choosePeople.map((p) => {
        return <span key={p} className="badge badge-primary mr-2">{p}</span>
    });

    const addNewPeople = () => {
        const newPeople = inputRef.current.value.trim();
        if (newPeople && !people.includes(newPeople)) {
            setPeople([...people, newPeople]);
        }
        inputRef.current.value = "";
    }

    const addChoosePeople = (p) => {
        if (!choosePeople.includes(p)) {
            setChoosePeople([...choosePeople, p]);
        } else {
            setChoosePeople([...choosePeople.filter(person => person !== p)]);
        }
    };

    const onSubmit = () => {
        sendDataToMenuList({menuName, price, people, choosePeople});
        setMenuName("");
        setPrice("");
        setPeople(getBasePeople);
        setChoosePeople([]);
    }
    
    return (
        <>
            <button className="btn w-full" onClick={openModal}>เพิ่ม</button>
            <dialog ref={dialogRef} id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">เพิ่มรายการ</h3>
                    <p className="py-4">ใส่รายละเอียดรายการ,ราคา,คนกิน</p>

                    {/* Menu name input */}
                    <label htmlFor="menuName">ชื่อรายการ</label>
                    <input id="menuName" type="text"  maxLength={20} className="border-2 rounded-2xl" value={menuName} onChange={(e) => setMenuName(e.target.value)}/>
                    <p>{menuName}</p>

                    {/* Price input */}
                    <label htmlFor="price">ราคา</label>
                    <input id="price" type="number" className="border-2 rounded-2xl" value={price} onChange={(e) => setPrice(e.target.value)}/>
                    <p>{price}</p>

                    {/* People input */}
                    <label htmlFor="addpeople">เพิ่มคน</label>
                    <input ref={inputRef} type="text" className="border-2 rounded-2xl" />
                    <button type="button" className='btn btn-secondary' onClick={addNewPeople}>เพิ่ม</button>

                    {/* List people */}
                    <div>{listPeople}</div>

                    <div>{listChoosePeople}</div>

                    {/* Save */}
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button onClick={onSubmit} className="btn" >Save</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default MenuModal