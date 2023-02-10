import './App.css';
import {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import data from './shoppingList.json'
import ShoppingListTile from "./ShoppingListTile";

export default class App extends Component {

    constructor(props, test) {
        super(props);
        this.state = {
            data: data
        };
        console.log(this.state.data)
    }

    deleteShoppingList = (id) => {
        let shoppingLists = this.state.data.shoppingLists;
        shoppingLists = shoppingLists.filter((list, index) => {
            console.log(index + " " + id);
            return index !== id
        });
        console.log(id)
        console.log(shoppingLists)
        this.setState({data: {shoppingLists: shoppingLists}})
    }

    render() {
        const generateRows = shoppingLists => {
            let rows = [];
            var index = 0;
            for (const element of shoppingLists) {
                let indexParam = index;
                rows.push(<div className="col-2"><ShoppingListTile shoppingList={element} listDeleter={() => this.deleteShoppingList(indexParam)}/></div> )
                index++;
            }
            return rows;
        }
        return (
            <div className="App">
                <div className="row">
                    {generateRows(this.state.data.shoppingLists)}
                </div>
            </div>
        );
    }
}
