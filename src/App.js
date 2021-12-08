import React, {Component} from "react";
import Nav from "./components/Nav";
import Body from "./components/Body";
import axios from "axios";
import faker from 'faker'

class App extends Component {
    constructor() {
        super()
        this.state = {
            products: [],
            manufacturer: [],
            fake: []
        }
      
    }
    
    //NOTE: You cant use let or const to define a method in a class!!!!!!!!

    
    deleteProduct = async(id) => { //Use an arrow function so you dont have to bind
        console.log(id)
        await axios.delete(`delete/${id}`) //getting the id from the delete route
        this.setState({products: this.state.products.filter(product => {
           return product.id !== id
        }
        /*Above setting the state of products using setState({}). The products: []
          array is changing by using the deleteProduct method. We use this.state.products and 
          then filter over them. You must use RETURN and we are checking if the product id is 
          not equal to the deleted id. 
        */
        )})
    }
    
    async componentDidMount() {
        const myProducts = await axios.get('/products')
        this.setState({products: myProducts.data})

        const myManufacturer = await axios.get('/manufacturer')
        this.setState({manufacturer: myManufacturer.data})

        const myFake = await axios.get('/')
        this.setState({fake: myFake.data})
        /* You can have as many axios calls as you want in your 
        componentDidMount()  */
    }
    
    render() {
       console.log(this.state)
        const { products, manufacturer, fake} = this.state //Destructuring here
        
        return (
            <div>
                <Nav />
                <Body products={products} fake ={fake}
                deleteProduct={this.deleteProduct}
                /* Passing the products, fake, and deleteProduct method down to the body. */
                />
            </div>
        )
    }
}

export default App;