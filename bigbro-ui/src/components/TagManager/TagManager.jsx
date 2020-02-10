import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Button } from '@material-ui/core'

const ADD_TAG = gql`
    mutation ADD_TAG($name: String!) {
        addTag(name: $name) {
            
        }
    }
`

const TagManager = ({ person }) => {
    return (
        <div>
            <Button>Add Tag to {person.name}</Button>
        </div>
    )
}