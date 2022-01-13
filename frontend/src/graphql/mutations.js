import { gql } from "@apollo/client";


// about  signup/ login/ logout

export const SIGN_UP_MUTATION = gql`
  mutation signup($SignupInput: SignupInput!){
    signup(SignupInput: $SignupInput){
        signup
    }
  }
`

export const LOG_IN_MUTATION = gql`
  mutation login($username: String!, $password: String!){
    login(username: $username, password: $password ){
        login
    }
  }
`

export const LOG_OUT_MUTATION = gql`
  mutation logout($username: String!, $password: String!){
    logout(username: $username, password: $password ){
        logout
    }
  }
`


// about ARTICLE: CREATE/UPDATE/DELETE
export const CREATE_ARTICLE_MUTATION = gql`
  mutation createArticle($password:String!, $username:String!, $brdname:String!, $title:String!, $content:String!){
    createArticle(password:$password, username:$username, brdname: $brdname, title:$title, content:$content){
        createArticle
    }
  }
`
export const UPDATE_ARTICLE_MUTATION = gql`
  mutation updateArticle($UpdateArticleInput: UpdateArticleInput!){
    updateArticle(UpdateArticleInput: $UpdateArticleInput){
        updateArticle
    }
  }
`
export const DELETE_ARTICLE_MUTATION = gql`
  mutation deleteArticle($DeleteArticleInput: DeleteArticleInput!){
    deleteArticle(DeleteArticleInput: $DeleteArticleInput){
        deleteArticle
    }
  }
`
//   {
//     "data": {
//       "createArticle": true
//     }
//   }

// about COMMENT: CREATE/UPDATE/DELETE
export const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($CreateCommentInput: CreateCommentInput!){
    createComment(CreateCommentInput: $CreateCommentInput){
        createComment
    }
  }
`
export const MODIFY_COMMENT_MUTATION = gql`
  mutation modifyComment($ModifyCommentInput: ModifyCommentInput!){
    modifyComment(ModifyCommentInput: $ModifyCommentInput){
        modifyComment
    }
  }
`
export const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($DeleteArticleInput: DeleteArticleInput!){
    deleteComment(DeleteArticleInput: $DeleteArticleInput){
        deleteComment
    }
  }
`
export const UPDATE_FAV_BOARDS_MUTATION = gql`
  mutation updateFavBoards($UpdateFavBoardsInput: UpdateFavBoardsInput!){
    updateFavBoards(UpdateFavBoardsInput: $UpdateFavBoardsInput){
        updateFavBoards
    }
  }
`

export const UPDATE_FAV_ARTICLES_MUTATION = gql`
  mutation updateFavArticles($UpdateFavArticlesInput: UpdateFavArticlesInput!){
    updateFavArticles(UpdateFavArticlesInput: $UpdateFavArticlesInput){
        updateFavArticles
    }
  }
`
