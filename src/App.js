import './App.css';
import {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import ShoppingListTile from "./ShoppingListTile";

export default class App extends Component {

    constructor(props, test) {
        super(props);
        this.state = {
            shoppingLists: []
        };
        fetch("shoppingList.json")
            .then((response) => response.json())
            .then((json) => this.setState({shoppingLists: json.shoppingLists}))
    }

    deleteShoppingList = (id) => {
        let shoppingLists = this.state.shoppingLists;
        shoppingLists = shoppingLists.filter((list) => {
            return list.id !== id
        });
        this.setState({shoppingLists: shoppingLists})
    }

    render() {
        console.log(this.state);
        const generateRows = shoppingLists => {
            let rows = [];
            for (const element of shoppingLists) {
                rows.push(<div className="col-2"><ShoppingListTile shoppingList={element} listDeleter={() => this.deleteShoppingList(element.id)}/></div> )
            }
            return rows;
        }
        return (
            <div className="App">
                <div className="row">
                    {generateRows(this.state.shoppingLists)}
                </div>
            </div>
        );
    }
}
