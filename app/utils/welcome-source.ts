export const welcomePreview = (name: string) => {
  return `
    Hi ${name}!

    Selamat datang di halaman catatan pertama Anda di Foutline 🎉 🎉

    Kami menyajikan setiap halaman dengan antarmuka yang terpisah, menciptakan pengalaman membaca
  `
}

export const welcomeTemp = (name: string) => {
  return {
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: `Hi ${name}!`,
          },
        ],
      },
      {
        type: 'paragraph',
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Selamat data di halaman catatan pertama Anda di ',
          },
          {
            type: 'text',
            marks: [
              {
                type: 'bold',
              },
            ],
            text: 'Foutline',
          },
          {
            type: 'text',
            text: ' ',
          },
          {
            type: 'text',
            marks: [
              {
                type: 'textStyle',
                attrs: {
                  color: 'rgb(0, 0, 0)',
                },
              },
            ],
            text: '🎉 🎉',
          },
        ],
      },
      {
        type: 'paragraph',
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Kami menyediakan setiap halaman dengan antarmuka yang terpisah, menciptakan pengalaman membaca dan mengedit yang lebih baik.',
          },
        ],
      },
      {
        type: 'paragraph',
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Untuk memulai pengeditan, cukup ketuk editor di mana saja atau tekan tombol di atas editor yang ingin Anda sunting.',
          },
        ],
      },
      {
        type: 'paragraph',
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Jika Anda telah selesai mencatat, tekan tombol "Selesai" atau gunakan pintasan keyboard: Command + S.',
          },
        ],
      },
      {
        type: 'paragraph',
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Jangan ragu untuk membatalkan pengeditan dengan menekan tombol "Batalkan" atau menggunakan pintasan keyboard: Esc.',
          },
        ],
      },
      {
        type: 'paragraph',
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            marks: [
              {
                type: 'bold',
              },
            ],
            text: 'Foutline',
          },
          {
            type: 'text',
            text: ' menyediakan berbagai template untuk mencatat keuangan Anda. Navigasi ke halaman "Jelajahi" atau ketuk "Buat Halaman" untuk membuat catatan keuangan baru. ',
          },
          {
            type: 'text',
            marks: [
              {
                type: 'textStyle',
                attrs: {
                  color: 'rgb(0, 0, 0)',
                },
              },
            ],
            text: '🎉 ',
          },
        ],
      },
      {
        type: 'paragraph',
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Selamat mencatat keuangan Anda bersama kami. ✨',
          },
        ],
      },
      {
        type: 'paragraph',
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Salam,',
          },
          {
            type: 'hardBreak',
          },
          {
            type: 'text',
            text: 'Ommi Putera (CEO ',
          },
          {
            type: 'text',
            marks: [
              {
                type: 'bold',
              },
            ],
            text: 'Foutline',
          },
          {
            type: 'text',
            text: ')',
          },
        ],
      },
    ],
  }
}
