import Button from 'react-bootstrap/Button';

function LandingPage() {
    return (
    <div className='container1'>
       
        <div className='question'>
            <div className='welcome'>QUIZ APPLICATION</div>
            <Button className='home' href="/quiz">Go to App</Button> 
            <Button className='home' href="/input">Input Data</Button> 
            <Button className='home' href="/edit">Edit Data</Button> 
       </div>
    </div>)
} 

export default LandingPage;