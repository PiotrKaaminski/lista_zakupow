import './ShoppingListTile.css';
import {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'

export default class ShoppingListTile extends Component {

    constructor(props) {
        super(props);
        this.shoppingList = props.shoppingList;
        this.listDeleter = props.listDeleter;
        this.state = {
            mode: "VIEW"
        }
    }
    renderProducts = products => {
        let rows = [];
        for (const element of products) {
            if (this.state.mode === "VIEW") {
                rows.push(<p>{element.name}: {element.amount}</p>)
            } else if (this.state.mode === "MODIFY") {
                rows.push(<input type="text" defaultValue={element.name + ":" + element.amount}/>)
            }
        }
        return rows;
    }

    setTileClass = () => {
        let classes = "shoppingListTile ";
        if (this.state.mode === "MODIFY") {
            return classes;
        }
        let nowTime = new Date().getTime()
        let tileTime = new Date(this.shoppingList.date).getTime();
        if (this.shoppingList.status === "FINISHED") {
            classes += "accepted";
        } else if (this.shoppingList.status === "PENDING" && nowTime > tileTime) {
            classes += "error";
        }

        return classes;
    }

    renderDate = date => {
        if (this.state.mode === "VIEW") {
            return <p>{date}</p>
        } else if (this.state.mode === "MODIFY") {
            return <input type="text" defaultValue={date}/>
        }
    }

    renderButtons = () => {
        if (this.state.mode === "VIEW") {
            let buttons = [];
            buttons.push(<button className={"btn btn-warning"} onClick={() => this.toggleViewMode("MODIFY")}>Zmodyfikuj</button>);
            buttons.push(<button className={"btn btn-danger"} onClick={() => this.listDeleter()}>Usuń</button>);
            return buttons;
        } else if (this.state.mode === "MODIFY") {
            let buttons = [];
            buttons.push(<button className={"btn btn-success"}>Akceptuj</button>);
            buttons.push(<button className={"btn btn-danger"} onClick={() => this.toggleViewMode("VIEW")}>Odrzuć</button>);
            return buttons;
        }
    }

    toggleViewMode = (newMode) => {
        this.setState({mode: newMode});
    }

    render() {
        return (
            <div className={this.setTileClass()}>
                {this.renderDate(this.shoppingList.date)}
                {this.renderProducts(this.shoppingList.products)}
                {this.renderButtons()}
            </div>
        );
    }
}
