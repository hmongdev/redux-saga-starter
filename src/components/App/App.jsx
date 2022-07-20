import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function App() {
    const dispatch = useDispatch();
    const elements = useSelector((store) => store.elementList);
    const [newElement, setNewElement] = useState('');

    //* 8. remove getElements
    // const getElements = () => {
    //     axios
    //         .get('/api/element')
    //         .then((response) => {
    //             dispatch({ type: 'SET_ELEMENTS', payload: response.data });
    //         })
    //         .catch((error) => {
    //             console.log('error with element get request', error);
    //         });
    // };

    useEffect(() => {
        //* 9. dispatch 'FETCH_ELEMENTS'
        dispatch({ type: 'FETCH_ELEMENTS' });
    }, []);

    const addElement = () => {
        //* 7. dispatch
        dispatch({ type: 'ADD_ELEMENT', payload: { name: newElement } });
        setNewElement('');
    };

    return (
        <div>
            <h1>Atomic Elements</h1>
            <ul>
                {elements.map((element) => (
                    <li key={element}>{element}</li>
                ))}
            </ul>

            <input
                value={newElement}
                onChange={(evt) => setNewElement(evt.target.value)}
            />
            <button onClick={addElement}>Add Element</button>
        </div>
    );
}

export default App;
