import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import BASE_URL_API from '../axios'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function EditQuest() {
    const [quests, setQuests] = useState([])
    const [quest, setQuest] = useState(null);
    const [op1, setOp1] = useState();
    const [op2, setOp2] = useState();
    const [op3, setOp3] = useState();
    const [op4, setOp4] = useState();
    const [ans, setAns] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState(false);
    const [qs, setQs] = useState();

    const handleClear = () => {
        setQuest(null);
        setOp1('');
        setOp2('');
        setOp3('');
        setOp4('');
        setAns('');
        setQs('')
        setIsLoading(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const newQuest = {
            qs: qs,
            a: op1,
            b: op2,
            c: op3,
            d: op4,
            ans: ans
        };

        const setData = async () => {
            await axios.put(`${BASE_URL_API}/${quest.id}`, newQuest).then(res => {
                setIsLoading(false);
                setQuests([...quests].map(q => q.id === quest.id ? {id: quest.id, ...newQuest} : q))
                setQuest({...newQuest, id: quest.id})
                console.log('Success');
            }).catch(err => {
                setIsLoading(false);
                setErr(true);
            });
        };
        setData();
    }
    const handleDelete = async () => {
        try {
            setIsLoading(true)
            if (quest) {
                const response = await axios.delete(`${BASE_URL_API}/${quest.id}`)
                if (response.status === 200) {
                    setErr(false)
                    setQuests([...quests].filter(q => q.id !== quest.id))
                    handleClear()
                }
            }
        } catch (error) {
            setIsLoading(false)
            setErr(true)
        }
    }

    const getQuestsHandler = async () => {
        try {
            const response = await axios.get(BASE_URL_API)
            if (response.data) {
                setQuests(response.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const selectQuestHandler = (e) => {
        const id = e.target.value
        const quest = quests.find(q => q.id === id)
        setQuest(quest)
        setQs(quest.qs)
        setOp1(quest.a)
        setOp2(quest.b)
        setOp3(quest.c)
        setOp4(quest.d)
        setAns(quest.ans)
    }


    const ShowResult = () => {
        if (!quest) {
            console.log('chua co du lieu');
            return null;
        } else if (err) { return <div>Upload failed!</div> }
        else return (<div>Upload Success!</div>)
    }

    useEffect(() => {
        getQuestsHandler()
    }, [])

    return (
        <div className='container'>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label className="label">Questions</Form.Label>
                    <Form.Select onChange={selectQuestHandler} value={quest?.id}>
                        <option value={null}>Select question</option>
                        {
                            quests.map((quest, index) => (
                                <option key={index} value={quest.id}>{quest.qs}</option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
                {
                    quest &&
                    <>
                        <Form.Group className="mb-3">
                            <Form.Label className="label">Question</Form.Label>
                            <Form.Control type="text" placeholder="Enter question" value={qs}
                                onChange={(e) => { setQs(e.target.value) }} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="label">Option A</Form.Label>
                            <Form.Control type="text" value={op1}
                                onChange={(e) => { setOp1(e.target.value) }} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="label">Option B</Form.Label>
                            <Form.Control type="text" value={op2}
                                onChange={(e) => { setOp2(e.target.value) }} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="label">Option C</Form.Label>
                            <Form.Control value={op3}
                                onChange={(e) => { setOp3(e.target.value) }} type="text" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="label">Option D</Form.Label>
                            <Form.Control type="text" value={op4}
                                onChange={(e) => { setOp4(e.target.value) }} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="label">Answer</Form.Label>
                            <Form.Select onChange={(e) => { setAns(e.target.value) }} value={ans}>
                                <option>A</option>
                                <option>B</option>
                                <option>C</option>
                                <option>D</option>
                            </Form.Select>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <Button variant="primary" className='buttonClear' onClick={handleDelete}>
                            delete
                        </Button>
                    </>
                }

            </Form>
            {isLoading ? <div>Uploading data..!</div> : <ShowResult />}
        </div>
    )
}

export default EditQuest