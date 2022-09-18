import { useQueryClient } from '@tanstack/react-query'
import { ChangeEvent, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Repository } from './repos'

export function Repo() {
  const [changeDescription, setChangeDescription] = useState('')
  const params = useParams()
  const currentRepository = params['*'] as string

  const queryClient = useQueryClient()

  function handleChangeDescription(event: ChangeEvent<HTMLInputElement>) {
    setChangeDescription(event.target.value)
  }

  //invalidar os dados armazenados em cache para que eles possam ser buscados novamente
  //permitindo que eles estejam atualizados conforme o necessário
  function handleChangeRepositoryDescription() {
    /* 
      dessa forma todos os dados em cache serão invalidados e uma nova 
      chamada HTTP vai ser feita para buscar os dados atualizados
        queryClient.invalidateQueries(['REPOS'])
    */

    //dessa forma, em vez de fazer uma nova chamada HTTP para buscar os dados
    //e atualizar a listagem, apenas fazemos uma manipulação dos dados em cache
    //alterando de forma expecífica no cache, o dado que foi modificado

    //bucar os dados que estão no cache
    const previousRepos = queryClient.getQueryData<Repository[]>(['REPOS'])

    //existe a posibilidade do cache estar vazio, então precisa fazer uma verificação antes
    //de começar a manipula-lo
    if(previousRepos) {
      //varrer o array de repositórios e fazer uma comparação para verificar
      //qual item deve ter o seu dado alterado, fazer a modificação no campo específico
      // e retornar o novo valor atualizado. 
      const nextRepos = previousRepos.map(repo => {
        if(repo.full_name === currentRepository) {
          return {...repo, description: changeDescription}
        } else {
          return repo
        }
      })

      //Inserir o dado atualizado no cache
      queryClient.setQueryData(['REPOS'], nextRepos)
    }
  }

  return (
    <div>
      <h1>{currentRepository}</h1>
      <input 
        type="text"
        value={changeDescription}
        placeholder="Alterar descrição"
        onChange={handleChangeDescription}
      />
      <button type="button" onClick={handleChangeRepositoryDescription} >
        Invalidar
      </button>
    </div>
  )
}