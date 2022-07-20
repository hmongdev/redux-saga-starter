import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App.jsx';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

//! 1. myGenerator generator
function* myGenerator() {
    try {
        yield true; //boolean
        yield 100; //number
        yield 'Hello!'; //string
        yield [1, 2, 3]; //array
        yield { name: 'Avery' }; //object
    } catch (error) {
        console.log(`ERR in myGenerator`, error);
    }
}

//! 2. Create instance
const goDogGo = myGenerator();

//! 3. call generator with .next()
console.log(goDogGo.next().value);
console.log(goDogGo.next().value);
console.log(goDogGo.next().value);
console.log(goDogGo.next().value);
console.log(goDogGo.next().value);

//! 4. getSwitch generator
function* getSwitch() {
    try {
        while (true) {
            yield 'on';
            yield 'off';
        }
    } catch (err) {
        console.log(`ERR in getSwitch`, err);
    }
}

//! 5. create instance
const toggle = getSwitch();

//! 6. call generator
console.log(toggle.next().value);
console.log(toggle.next().value);
console.log(toggle.next().value);
console.log(toggle.next().value);
console.log(toggle.next().value);
console.log(toggle.next().value);

const elementList = (state = [], action) => {
    switch (action.type) {
        case 'SET_ELEMENTS':
            return action.payload;
        default:
            return state;
    }
};

//! 6. countDown generator
// Generators can have loops, conditional statements, variables and even return (just be careful about return! That still will stop!).
function* countDownGenerator() {
    let a = 10;
    while (a > 0) {
        yield `Launching in ${a}`;
        a -= 1;
    }
    yield `Take off!`;
}

const countDown = countDownGenerator();
console.log(countDown.next().value);
console.log(countDown.next().value);
console.log(countDown.next().value);
console.log(countDown.next().value);
console.log(countDown.next().value);
console.log(countDown.next().value);
console.log(countDown.next().value);
console.log(countDown.next().value);
console.log(countDown.next().value);
console.log(countDown.next().value);
console.log(countDown.next().value);

// this is the saga that will watch for actions
function* watcherSaga() {}

const sagaMiddleware = createSagaMiddleware();

// This is creating the store
// the store is the big JavaScript Object that holds all of the information for our application
const storeInstance = createStore(
    // This function is our first reducer
    // reducer is a function that runs every time an action is dispatched
    combineReducers({
        elementList,
    }),
    applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(watcherSaga);

ReactDOM.render(
    <Provider store={storeInstance}>
        <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
