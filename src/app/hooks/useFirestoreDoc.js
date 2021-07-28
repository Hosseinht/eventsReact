import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {asyncActionError, asyncActionFinish, asyncActionStart} from "../async/asyncReducer";
import {dataFromSnapshot} from "../firestore/firestoreService";


const useFirestoreDoc = ({query, data, deps}) => {
    // query: firestore query. data: what to do when we receive the data. deps:dependencies that we need for example useEffect hook

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(asyncActionStart());
        const unsubscribe = query().onSnapshot(
            snapshot => {
                data(dataFromSnapshot(snapshot));
                dispatch(asyncActionFinish());
            },
            error => dispatch(asyncActionError())
        );
        return () => {
            unsubscribe()
        }
    }, deps) // eslint-disable-line react-hooks/exhaustive-deps
};

export default useFirestoreDoc;
