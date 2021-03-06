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
            push
            boo
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
            aid
            brdname
            title
            owner
            create_time
            content
            brdname
            location {
                ip
                country
                }
            comments {
                cid
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
    query articles ($input: articlesInput!) {
        articles(input: $input){
            title
            aid
            brdname
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
            boo
            push
        }
}
`;

// 5. query - user
export const GET_USER = gql`
    query user ($input: userInput!){
        user(input: $input){
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
    query salt ($username: String!){
        salt(username: $username)
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
        aid
        brdname
        title
        owner
        create_time
        push
        boo
    }
}
`;

// 9. query - 熱門文章list ok
export const GET_HOTARTICLES = gql`
query hotArticles{
    hotArticles{
        brdname
        title
        create_time
        owner
        push
        boo
        owner
        aid
    }
}
`;