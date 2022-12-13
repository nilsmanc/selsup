import React, { useState } from 'react'

import { Button } from '@mui/material'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import './App.css'

interface Param {
  id: number
  name: string
  type: 'string'
}
interface ParamValue {
  paramId: number
  value: string
}

interface Props {
  params: Param[]
  model: ParamValue[]
  setModel: ([]) => void
}

const initialStateParams = [
  {
    id: 1,
    name: 'Назначение',
    type: 'string' as const,
  },
  {
    id: 2,
    name: 'Длина',
    type: 'string' as const,
  },
]

const initialStateModels = [
  {
    paramId: 1,
    value: 'повседневное',
  },
  {
    paramId: 2,
    value: 'макси',
  },
]

const ParamEditor: React.FC<Props> = ({ params, model, setModel }) => {
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>, id: number): void => {
    const value = e.target.value

    setModel(model.map((model) => (model.paramId === id ? { ...model, value } : model)))
  }

  const getModel = (id: number): ParamValue[] => {
    return model.filter((model) => model.paramId === id)
  }

  return (
    <>
      {params.map((param) => (
        <Typography component={'span'} key={param.id}>
          <p className='title'>{param.name}</p>
          <div className='field'>
            <TextField
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeHandler(e, param.id)}
              value={getModel(param.id)[0].value}
              type={param.type}
            />
          </div>
        </Typography>
      ))}
    </>
  )
}

const App: React.FC = () => {
  const [params, setParams] = useState<Param[]>(initialStateParams)
  const [model, setModel] = useState<ParamValue[]>(initialStateModels)

  const getStructure = () => {
    const structure = {
      params: { ...params },
      model: { ...model },
    }

    console.log(structure)

    alert('Структура в консоли')
  }

  return (
    <div className='wrapper'>
      <ParamEditor params={params} model={model} setModel={setModel} />
      <Button onClick={getStructure}>Получить Структуру</Button>
    </div>
  )
}

export default App
