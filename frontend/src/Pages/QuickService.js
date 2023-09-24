import React from 'react'

const QuickService = () => {
    return (
        <>
            {/* div for entering requirements */}
            <div className='d-flex justify-content-center align-items-center border vh-100 container-fluid'>
                <form className='d-flex justify-content-center flex-column'>
                    <select className="form-select my-3 " aria-label="Default select example">
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                    <select className="form-select my-3 " aria-label="Default select example">
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                    <button className='btn btn-dark my-3' type='submit'>Continue</button>
                    
                </form>
            </div>
        </>
    )
}

export default QuickService