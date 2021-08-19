import { GetStaticProps } from 'next';
import React, { useState } from 'react';
import { Htag, Button, Ptag, Tag, Rating } from '../components';
import { withLayout} from '../layout/Layout';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interfaces';

 function Home({menu}: HomeProps): JSX.Element {
  const [counter, setCounter] = useState<number>(0);

  const [rating, setRating] = useState<number>(4);


  return (
    <>
      <Htag tag='h1'>{counter}</Htag>
      <Button appearance='primary' className='asdasd' arrow='right' onClick={() => setCounter(x => x + 1)}>Button</Button>
      <Button appearance='ghost' arrow='down'>Button</Button>
      <Ptag size='s'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi reprehenderit saepe esse nobis sequi.</Ptag>
      <Ptag size='m'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi reprehenderit saepe esse nobis sequi.</Ptag>
      <Ptag size='l'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi reprehenderit saepe esse nobis sequi.</Ptag>
      <Tag size='s'>Ghost</Tag>
      <Tag size='m' color='red'>red</Tag>
      <Tag size='s' color='green'>green</Tag>
      <Tag size='m' color='grey'>grey</Tag>
      <Tag size='m' color='primary'>primary</Tag>
      <Rating rating={rating} isEditable setRating={setRating}/>
      <ul>
        {menu.map(m => (<li key={m._id.secondCategory}>{m._id.secondCategory}</li>))}
      </ul>
    </>
  );
}



export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const {data: menu} = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + 'api/top-page/find',{
    firstCategory
  });
  return {
    props: {
        menu,
        firstCategory
    }
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}