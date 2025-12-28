import { useRef, useState, useEffect } from 'react'
import { Pencil } from 'lucide-react';

function ChoosePeopleModal({sendDataToMenuList, getBasePeople, getChoosePeople}) {
    const [people, setPeople] = useState([]);
    const [choosePeople, setChoosePeople] = useState([]);

    const dialogRef = useRef(null);
    const inputRef = useRef(null);
    const openModal = () => {
        dialogRef.current.showModal();
    }

    useEffect(() => {
        setPeople(getBasePeople);
    }, [getBasePeople]);

    useEffect(() => {
        setChoosePeople(getChoosePeople);
    }, [getChoosePeople]);

    const addNewPeople = () => {
        const newPeople = inputRef.current.value.trim();
        if (newPeople && !people.includes(newPeople)) {
            setPeople([...people, newPeople]);
        }
        inputRef.current.value = "";
    }

    const listPeople = people.map((p) => {
        if (choosePeople.includes(p)) {
            return <span key={p} onClick={() => addChoosePeople(p)} className="badge badge-primary mr-2">{p}</span>
        } else {
            return <button key={p} onClick={() => addChoosePeople(p)} className="badge badge-default mr-2">+ {p}</button>
        }
    });

    const addChoosePeople = (p) => {
        if (!choosePeople.includes(p)) {
            setChoosePeople([...choosePeople, p]);
        } else {
            setChoosePeople([...choosePeople.filter(person => person !== p)]);
        }
    };

    const listChoosePeople = choosePeople.map((p) => {
        return <span key={p} className="badge badge-primary mr-2">{p}</span>
    });

    const onSubmit = () => {
        sendDataToMenuList({people, choosePeople});
    }

    return (
        <>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button className="btn" onClick={openModal}><Pencil className='w-4 h-4'/></button>
        <dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Press ESC key or click the button below to close</p>

            {/* People input */}
            <label htmlFor="addpeople">เพิ่มคน</label>
            <input ref={inputRef} type="text" className="border-2 rounded-2xl" />
            <button type="button" className='btn btn-secondary' onClick={addNewPeople}>เพิ่ม</button>

            {/* List people */}
            <div>{listPeople}</div>

            {/* List Choose people */}
            <div>{listChoosePeople}</div>

            <div className="modal-action">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button onClick={onSubmit} className="btn">save</button>
                </form>
            </div>
        </div>
        </dialog>
        </>
    )
}

export default ChoosePeopleModal