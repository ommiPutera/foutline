export const temp1 = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'ini untuk template 1',
        },
      ],
    },
    {
      type: 'paragraph',
    },
    {
      type: 'taskList',
      content: [
        {
          type: 'taskItem',
          attrs: {
            pocket: 'none',
            for: 'monthly-income',
            checked: false,
          },
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Rp. 90,000',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'paragraph',
    },
    {
      type: 'taskList',
      content: [
        {
          type: 'taskItem',
          attrs: {
            pocket: 'none',
            for: 'monthly-expense',
            checked: false,
          },
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Rp. 10,000',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export const previewTemp1 = `
ini untuk template 1

Rp. 90,000

Rp. 10,000
`

export const temp2 = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'ini untuk template 2',
        },
      ],
    },
    {
      type: 'paragraph',
    },
    {
      type: 'taskList',
      content: [
        {
          type: 'taskItem',
          attrs: {
            pocket: 'none',
            for: 'monthly-income',
            checked: false,
          },
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Rp. 90,000',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'paragraph',
    },
    {
      type: 'taskList',
      content: [
        {
          type: 'taskItem',
          attrs: {
            pocket: 'none',
            for: 'monthly-expense',
            checked: false,
          },
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Rp. 10,000',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export const previewTemp2 = `
ini untuk template 2

Rp. 90,000

Rp. 10,000
`
