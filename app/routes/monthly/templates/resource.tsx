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
      type: 'heading',
      attrs: {
        level: 3,
      },
      content: [
        {
          type: 'text',
          text: 'Gaji Freelance',
        },
      ],
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
                  text: 'Rp. 21,500,000',
                },
              ],
            },
          ],
        },
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
                  text: 'Rp. 600,000 (Platform fee)',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Reminder: "Jangan lupa tagih utang dengan si Dia".',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 3,
      },
      content: [
        {
          type: 'text',
          text: 'Piutang',
        },
      ],
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
                  text: 'Rp. 8,500,000',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Dibayarkan pada tanggal 12 Februari 2024.',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 3,
      },
      content: [
        {
          type: 'text',
          text: 'Kosan',
        },
      ],
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
                  text: 'Rp. 2,300,000',
                },
              ],
            },
          ],
        },
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
                  text: 'Rp. 70,000 (Ganti handle pintu)',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Keterangan: ',
        },
        {
          type: 'text',
          marks: [
            {
              type: 'bold',
            },
          ],
          text: 'LUNAS',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 3,
      },
      content: [
        {
          type: 'text',
          text: 'Staycation',
        },
      ],
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
                  text: 'Rp. 12,280,200 (Hotel Grand Hyaat Jakarta)',
                },
                {
                  type: 'hardBreak',
                },
                {
                  type: 'text',
                  marks: [
                    {
                      type: 'italic',
                    },
                  ],
                  text: 'Tanggal: 17 Februari 2024 - 19 Februari 2024',
                },
              ],
            },
          ],
        },
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
                  text: 'Rp. 500,000 (Makan di Gyukaku)',
                },
              ],
            },
          ],
        },
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
                  text: 'Rp. 200,000 (Ancol)',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 3,
      },
      content: [
        {
          type: 'text',
          text: 'Gaji Bulanan',
        },
      ],
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
                  text: 'Rp. 12,900,000 (Pokok)',
                },
              ],
            },
          ],
        },
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
                  text: 'Rp. 300,000 (Potongan lainnya)',
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
