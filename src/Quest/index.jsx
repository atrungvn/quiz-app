const Quest = (props) => {

    console.log('data imported: ', props.data);
    console.log(props.idx);
    return (
        <div className='container'>
                    <div className='question'>
                        <div className='QS'>{ props.data[props.idx].qs }</div>
                        <div className='result'>{ props.data[props.idx].a }</div>
                        <div className='result'>{ props.data[props.idx].b }</div>
                        <div className='result'>{ props.data[props.idx].c }</div>
                        <div className='result'>{ props.data[props.idx].d }</div>
                    </div>
            
            <button onClick={() => { props.nextqs(props.idx)} }>Next Question</button>
            <button onClick={() => { props.prevqs(props.idx)} }>Previous Question</button>
        </div>
        
    )
}
export default Quest;