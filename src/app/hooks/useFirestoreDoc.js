import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {asyncActionError, asyncActionFinish, asyncActionStart} from "../async/asyncReducer";
import {dataFromSnapshot} from "../firestore/firestoreService";

//this will be used in EventDetailPage

const useFirestoreDoc = ({query, data, deps}) => {
    // query: firestore query. data: what to do when we receive the data. deps:dependencies that we need for example useEffect hook

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(asyncActionStart());
        const unsubscribe = query().onSnapshot(
            snapshot => {
                // console.log(snapshot)
                if (!snapshot.exists) {
                    dispatch(asyncActionError({code: 'not-found', message: 'Could not find document'}))
                    return;
                    // return means we don't continue from here
                }
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
