// Copyright (C) 2012-2022 Zammad Foundation, https://zammad-foundation.org/

import { cloneDeep } from 'lodash-es'
import { FormKitExtendableSchemaRoot, FormKitNode } from '@formkit/core'
import { password as passwordDefinition } from '@formkit/inputs'
import initializeFieldDefinition from '@shared/form/core/initializeFieldDefinition'

const localPasswordDefinition = cloneDeep(passwordDefinition)

const switchPasswordVisibility = (node: FormKitNode) => {
  const { props } = node

  node.addProps(['passwordVisibilityIcon'])

  if (!props.definition) return

  const definition = cloneDeep(props.definition)

  props.passwordVisibilityIcon = 'eye'

  const originalSchema = definition.schema as FormKitExtendableSchemaRoot

  definition.schema = (extensions) => {
    const localExtensions = {
      ...extensions,
      suffix: {
        $el: 'span',
        children: [
          {
            $cmp: 'CommonIcon',
            props: {
              name: '$passwordVisibilityIcon',
              key: node.name,
              class: 'absolute top-1/2 transform -translate-y-1/2 right-3',
              size: 'small',
              onClick: () => {
                props.type = props.type === 'password' ? 'text' : 'password'
              },
            },
          },
        ],
      },
    }
    return originalSchema(localExtensions)
  }

  props.definition = definition

  node.on('prop:type', ({ payload, origin }) => {
    const { props } = origin
    props.passwordVisibilityIcon = payload === 'password' ? 'eye' : 'eye-off'
  })
}

initializeFieldDefinition(localPasswordDefinition, {
  features: [switchPasswordVisibility],
})

export default {
  fieldType: 'password',
  definition: localPasswordDefinition,
}
