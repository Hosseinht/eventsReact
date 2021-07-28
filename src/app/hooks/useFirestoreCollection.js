import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {asyncActionError, asyncActionFinish, asyncActionStart} from "../async/asyncReducer";
import {dataFromSnapshot} from "../firestore/firestoreService";


const useFirestoreCollection = ({query, data, deps}) => {
    // query: firestore query. data: what to do when we receive the data. deps:dependencies that we need for example useEffect hook

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(asyncActionStart());
        const unsubscribe = query().onSnapshot(
            snapshot => {
                const docs = snapshot.docs.map(doc => dataFromSnapshot(doc));
                data(docs)
                dispatch(asyncActionFinish())
            },
            error => dispatch(asyncActionError())
        );
        return () => {
            unsubscribe()
        }
    }, deps) // eslint-disable-line react-hooks/exhaustive-deps
    // we are going to pass the dependencies from the component that uses this hook. so to remove the warning
};

export default useFirestoreCollection;
