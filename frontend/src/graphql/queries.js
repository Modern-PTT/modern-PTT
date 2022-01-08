import { gql } from "@apollo/client";

// query - 全站最新文章List
// export const GET_NEWEST_AIRTICLES_QUERY = gql`
//   query newestArticles($limit: limit) 
//     newestArticles(limit: $limit){
//         brdname
//         title
//         owner
//         create_time
//     }
//   }
// `;

// query - 單篇文章內容
export const GET_ARTICLE_QUERY = gql`
    query article ($aid: String!) {
        article(aid: $aid){
            title
            owner
            content
            location {
                ip
                country
                }
            comments {
                type
                owner
                content
                location {
                    ip
                    country
                    }
                create_time
            }
        }
}
`;
// query - 單一看板文章list
export const GET_BOARD_ARTICLES_QUERY = gql`
query board($brdname: String!){
    board(brdname: $brdname){
        brdname
        articles {
            aid
            owner
            title
            create_time
        }
    }
}
`;
// query {
//     board (brdname: "Baseball") {
//       articles {
//         aid
//         title
//         owner
//       }
//     }
//   }

// query - 所有看板 list
export const GET_ALLBOARDS_QUERY = gql`
query {
    boards {
      brdname
      type
      class
      title
      moderators
    }
  }
`;

