// // import Button from '@material-ui/core/Button';
// import styled from 'styled-components';
// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
// import Paper from '@material-ui/core/Paper';



// const useStyles = makeStyles({
//   root: {
//     minWidth: 275,
//   },
//   bullet: {
//     display: 'inline-block',
//     margin: '0 2px',
//     transform: 'scale(0.8)',
//   },
//   title: {
//     fontSize: 14,
//   },
//   pos: {
//     marginBottom: 12,
//   },
// });
// const Wrapper = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
//   width: 700px;
// `;

// const Row = styled.div`
//   display: flex;
//   flex-direction: row;
// `;

// const data = 
//     {
//         airtile_id: "123254521",
//         title: "陽明大學與交通大學合併",
//         time: "2021.12.12",
//         poster_id: 'kky1',
//         poster_ip: '192.168.2.1',
//         detail: "國立交通大學與國立陽明大學合校作業，今天由廠商到交大校門拆除「國立交通大學」銜牌，預計週末掛上新校名「國立陽明交通大學」，並在2月1日揭牌。國立陽明大學與國立交通大學合併案獲行政院及教育部同意，預計2月1日起合併為「國立陽明交通大學」。國立交通大學與國立陽明大學合校作業，今天由廠商到交大校門拆除「國立交通大學」校銜名牌，預計週末掛上新校銜「國立陽明交通大學」。交大提供新聞資料表示，合校後的陽明交通大學，預計2月1日由首任校長林奇宏分別在台北陽明校區、新竹光復校區舉辦揭牌儀式。「國立交通大學」的校名將走入歷史，近期有不少民眾到校門口與「國立交通大學」字樣合影留念，希望將歷史畫面保留下來，甚至出現排隊拍照打卡人潮。交大工業工程與管理系鄧姓碩二生告訴中央社記者，未來學校名稱將成為國立陽明交大，得知校方今天要拆除校銜名牌，特別和老師、學生一起到場記錄歷史性一刻。去年從交大博士班畢業的校友則說，他在交大唸了7年博士班，宿舍就在校門附近，每天都會路過看到的校銜名牌今天將走入歷史，特別請假到場見證，盼陽明、交大合併後會有更棒的發展。（編輯李錫璋）",
//         messages:{
//             message_id: "123254521",
//             time: "2021.12.12",
//             state: "1",
//             poster_id: 'kky2',
//             poster_ip: '192.168.2.1',
//             body: "這樣好嗎？",
//         }
//     }


// export default function Messages() {
//   const classes = useStyles();
//   const bull = <span className={classes.bullet}>•</span>;

//   return (
//       <Wrapper>
//         <Card className={classes.root} variant="outlined">
//             <CardContent>
//                 <Row>
//                     <Typography className={classes.title} color="textSecondary" gutterBottom>
//                     <>{data.poster_id}{data.time}{data.poster_ip}</>
//                     <Button size="small">Learn More</Button>
//                     </Typography>
//                 </Row>

//                 <Typography className={classes.title} color="textSecondary" gutterBottom>
//                 {data.messages.body}
//                 </Typography>
//             </CardContent>
//         </Card>
//     </Wrapper>
//   );
// }

// // const Airticle = () =>{

// //     return(
// //         <Wrapper>
// //             <Button variant="contained">Default</Button>
// //         </Wrapper>

// //     )
// // }

// // export default Airticle;
