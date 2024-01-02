import { useSelector } from 'react-redux';

function sample() {
    const convoList = useSelector((state) => state.baseData['convo_comp']);
    console.log(convoList);
    return convoList;
}

export default sample();
