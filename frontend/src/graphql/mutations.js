import { gql } from "@apollo/client";


// about  signup/ login/ logout

export const SIGN_UP_MUTATION = gql`
  mutation signup($input: SignupInput!){
    signup(input: $input)
  }
`

export const LOG_IN_MUTATION = gql`
  mutation login($username: String!, $password: String!){
    login(username: $username, password: $password )
  }
`

export const LOG_OUT_MUTATION = gql`
  mutation logout($username: String!, $password: String!){
    logout(username: $username, password: $password )
  }
`


// about ARTICLE: CREATE/UPDATE/DELETE
export const CREATE_ARTICLE_MUTATION = gql`
  mutation createArticle($input: CreateArticleInput!){
    createArticle(input:$input)
  }
`
export const UPDATE_ARTICLE_MUTATION = gql`
  mutation updateArticle($input: UpdateArticleInput!){
    updateArticle(input: $input){
        updateArticle
    }
  }
`
export const DELETE_ARTICLE_MUTATION = gql`
  mutation deleteArticle($input: DeleteArticleInput!){
    deleteArticle(input: $input){
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
