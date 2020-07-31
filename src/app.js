import React, { useState, useEffect } from 'react';
import './App.css';

require('dotenv').config()

const InputForm = (props) => (

    <form className={'ui form'} onSubmit={handleSubmit}>

        <div className={'field'}>
            <label>What are you in the mood for?</label>
            <input 
                type='text' 
                name='recipe_keywords' 
                required 
                onChange={props.handleInputChange}
                placeholder="Search keywords, ingredients, cuisines etc.">
                
            </input>    
        </div>

        <button className={'massive fluid posigit ptive ui button'} type='submit'>Search Recipes</button>
    </form>

)

function App() {

    const [input, setInput] = useState('')
    const [results, setResults] = useState([])
    const [resultIndex, setResultIndex] = useState(0)

    const handleInputChange = e => {
        newInput = input
        newInput += e.currentTarget.value
        setInput(newInput)
    }

    const searchKeywords = async (e) => {
        e.preventDefault()

        try {
            let keywords = input
            if (!keywords)
                return 
            setInput('')
            let fetchResults = await fetch(`https://api.spoonacular.com/recipes/search?query=${keywords}&
            informationinstructionsRequired=true&${process.env.spoonacular_key}`)
            let resultsJson = await fetchResults.json()

            if (resultsJson.length === 0)
            return
        
            setResults(resultsJson.results)

        } 
        catch(e) {
            console.warn(e)
        }

    }

    const renderRecipe = () => {

        let currentRecipe = results[resultIndex] ? results[resultIndex] : null

        if (!currentRecipe)
            return
        
        return (

            <div className="ui-container">
                <h4>currentRecipe.title</h4>
                <img src={`https://spoonacular.com/recipeImages/${result.id}-312x231.jpg`}></img>
                <button>Text me this</button>
                <button>Show me another</button>
            </div>

        )
        
    }

    // twilio module to text this?

}

export default App;