import { Provider } from "react-redux"
import { Routing } from "../ROUTING/Routing"
import store from "../REDUX/store"
export const Main = () => {
    return <>
        <Provider store={store}>
            <Routing></Routing>
        </Provider>
    </>
}