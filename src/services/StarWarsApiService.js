import { gql } from '@apollo/client';

export const STAR_WARS_PEOPLE = gql`
  query StarWarsPeople($cursor: String){
    allPeople(first: 5, after: $cursor) {
      edges{
        node{
            id
            name
            species {
              name
            }
            homeworld {
              name
            }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    } 
  }
`;

export const STAR_WARS_PERSON = gql`
  query Person($id: ID){
    person(id: $id){
      name
      gender
      hairColor
      eyeColor
      skinColor
      birthYear
      vehicleConnection{
        vehicles {
          name
        }
      }
      starshipConnection{
        starships{
          name
        }
      }
    } 
  }
`;


/* export const STAR_WARS_PEOPLE = gql`
    query {
      allPeople(first: 5, after: "YXJyYXljb25uZWN0aW9uOjE=") {
        edges{
          cursor
            node{
                id
                name
            }
          }
        } 
    }
`;
 */