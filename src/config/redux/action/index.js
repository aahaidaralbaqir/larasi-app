import { api, headerOptions } from '../../api'

export const setDataFavorite = (data) => {
  return {
    type : 'SET_FAVORITE',
    payload :  data
  }
}

export const fetchDataFavorite = token => {
  return (dispatch,getState) => {
    dispatch({type : 'SET_IS_LOADING_WEBTOON', payload : true})
    api.get("/webtoons?is_favorite=true",headerOptions(token))
      .then(response => {
        let {data : { data }} = response
        let favorite = data.filter((item) => item.favorite !== false)
        dispatch(setDataFavorite(favorite))
        dispatch({type : 'SET_IS_LOADING_WEBTOON', payload : false})
      })
      .catch(err => {
        dispatch(setIsLoading(false))
        console.log(err)
      })
  }
}

export const setDataWebtoon = (data) => {
  return {
    type : 'SET_WEBTOON',
    payload : data
  }
}

export const fetchDataWebtoon = token => {
  return (dispatch,getState) => {
    dispatch({type : 'SET_IS_LOADING_WEBTOON', payload : true})
    api.get("/webtoons",headerOptions(token))
      .then(response => {
        let {data : { data }} = response
        dispatch(setDataWebtoon(data))
        dispatch({type : 'SET_IS_LOADING_WEBTOON', payload : false})
      })
      .catch(err => {
        dispatch({type : 'SET_IS_LOADING_WEBTOON', payload : false})
        console.log(err)
      })
  }
}

export const setDataEpisode = (data) => {
  return  {
    type : 'SET_EPISODE',
    payload : data
  }
}

export const fetchDataEpisode = (token,webtoon_id) => {
  return (dispatch,getState) => {
    dispatch({type : 'SET_IS_LOADING_WEBTOON', payload : true})
    api.get(`/webtoons/${webtoon_id}/episodes`,headerOptions(token))
      .then(response => {
        let {data : { data }} = response
        dispatch(setDataEpisode(data))
        dispatch({type : 'SET_IS_LOADING_WEBTOON', payload : false})
      })
      .catch(err => {
        dispatch({type : 'SET_IS_LOADING_WEBTOON', payload : false})
        console.log(err)
      })
  }
}

export const setMyWebtoon = (data) => {
  return {
    type : 'SET_MYWEBTOON',
    payload : data
  }
}

export const fetchDataMyWebtoon = (token,user_id) => {
  return (dispatch,getState) => {
    dispatch({type : 'SET_IS_LOADING_USER', payload : true})
    api.get(`/user/${user_id}/webtoons`,headerOptions(token))
      .then(response => {
        let {data : { data }} = response
        dispatch(setMyWebtoon(data))
        dispatch({type : 'SET_IS_LOADING_USER', payload : false})
      })
      .catch(err => {
        dispatch({type : 'SET_IS_LOADING_USER', payload : false})
        console.log(err)
      })
  }
}

export const setDataChapter = (data) => {
  return {
    type : 'SET_CHAPTER',
    payload : data
  }
}

export const fetchDataChapter = (user_id,token,episode_id) => {
  return (dispatch) => {
    dispatch({type : 'SET_IS_LOADING_WEBTOON', payload : true})
    api.get(`/user/${user_id}/webtoon/3/episode/${episode_id}/images`,headerOptions(token))
      .then(response => {
        let {data : { data }} = response
        dispatch(setDataChapter(data))
        dispatch({type : 'SET_IS_LOADING_WEBTOON', payload : false})
      })
      .catch(err => {
        dispatch({type : 'SET_IS_LOADING_WEBTOON', payload : false})
    })
  }
}

export const setCurUser = (objUser) => {
  return {
    type : 'SET_CURR_USER',
    payload : objUser
  }
}