
import { useEffect } from 'react';
import Car from './Car';
import Category from './Category';
import useAppDispatch from '../hooks/useAppDispatch';
import { getCategory } from '../store/category.slice';
import { getCar } from '../store/car.slice';


const Dashboard = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getCategory())
    dispatch(getCar())

  }, [])

  return (
    <div className='p-12' >
      <Category />
      <Car />
    </div>
  )
}

export default Dashboard