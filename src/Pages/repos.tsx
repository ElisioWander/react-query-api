import { useState } from "react"
import { api } from "../services/axios"
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

export type Repository = {
  full_name: string
  description: string
}

export function Repos() {
  const [search, setSearch] = useState('')

  //buscando repositorios do github e armazenando os dados no cache do navegador
  //utilizando a chave ['REPOS']
  const { data: repositories } = useQuery<Repository[]>(['REPOS'], async () => {
    const response = await api.get('users/elisioWander/repos')

    return response.data
  }, {
    //define o tempo em que os dados no cache se tornarão obsoletos
    staleTime: 1000 * 60 // 1 min
  })
  
  const filteredRepos = repositories?.filter(repo => repo.full_name.includes(search))

  return (
    <div>
      <span>Search</span>
      <input 
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Buscar repos"
      />

      <div>
        <ul>
          {filteredRepos?.map(repo => (
            <li key={repo.full_name} >
              <Link to={`/repo/${repo.full_name}`} >
                <strong>{repo.full_name}</strong>              
              </Link>
              <p>{repo.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

