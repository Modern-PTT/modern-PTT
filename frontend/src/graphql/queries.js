import { gql } from "@apollo/client";


// 1. query - 特定看板 list
export const GET_BOARD_QUERY  = gql`
query board($brdname: String!){
    board(brdname: $brdname) {
        articles {
            brdname
            aid
            owner
            title
            create_time
            deleted
          }
    }
  }
`;


// 2. query all or search board HotBoards
export const GET_BOARDS_QUERY = gql`
query boards($keywords: [String!]){
    boards(keywords: $keywords){
      brdname
      type
      class
      title
      moderators
  }
}
`;


// 3. query - 單篇文章內容
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

// 4. query - 
export const GET_ARTICLES_QUERY = gql`
    query articles ($aid: String!) {
        articles(aid: $aid){
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

// 5. query - user
export const GET_USER = gql`
    query user ($username: String!, $password: String){
        user(username: $username, password: $password){
            username
            realname
            nickname
            login_days
            last_login
            post
            money
        
            first_login
            fav_boards {
                brdname
            }
        }
    }
`
// 6. query - salt
export const GET_SALT = gql`
    query salt ($username: username){
        salt(username: $username){
            salt
        }
    }
`



// 7. query - 熱門看板list ok HotBoards
export const GET_HOTBOARDS = gql`
query hotBoards{
    hotBoards{
        brdname
        class
        title
        moderators
    }
}
`;


// 8. query - 熱門文章
export const GET_NEWEST_ARTICLES = gql`
query newestArticles($limit: Int!){
    newestArticles(limit: $limit){
        brdname
        title
        owner
        create_time
    }
}
`;

// 9. query - 熱門文章list ok
export const GET_HOTARTICLES = gql`
query hotArticles{
    hotArticles{
        title
        create_time
        push
        boo
    }
}
`;