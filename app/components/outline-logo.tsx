import { useTheme } from '~/utils/theme-provider.tsx'

type TVariant = 'sm' | 'md' | 'default'

function LogoSmall() {
  const [theme] = useTheme()
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="22"
      fill={theme === 'light' ? '#000' : '#FFF'}
      viewBox="0 0 80 22"
    >
      <path
        fill="#000"
        fillRule="evenodd"
        d="M10.755 21.51c5.94 0 10.755-4.815 10.755-10.755S16.695 0 10.755 0 0 4.815 0 10.755 4.815 21.51 10.755 21.51zm.783-14.362c.205.104.397.242.568.413l1.88 1.879a2.225 2.225 0 010 3.147l-1.88 1.879a2.226 2.226 0 01-.568.413c.835.422 1.88.285 2.578-.413l1.88-1.88a2.225 2.225 0 000-3.146l-1.88-1.88a2.226 2.226 0 00-2.578-.412zm-4.655.347a2.225 2.225 0 013.147 0l1.879 1.879a2.225 2.225 0 010 3.147l-1.88 1.879a2.225 2.225 0 01-3.146 0l-1.88-1.88a2.225 2.225 0 010-3.146l1.88-1.88zM58.384 7.871v8.972h2.114V7.871h-2.114zm.199-1.606c.241.222.53.333.864.333.339 0 .627-.111.865-.333.241-.226.362-.497.362-.812 0-.32-.121-.59-.362-.812a1.209 1.209 0 00-.865-.339c-.335 0-.623.113-.864.339a1.061 1.061 0 00-.363.812c0 .315.121.586.363.812zm5.875 5.321v5.257h-2.114V7.871h2.021v1.525h.105c.207-.503.536-.902.987-1.198.456-.296 1.019-.444 1.688-.444.62 0 1.159.133 1.618.397.464.265.822.649 1.075 1.151.257.502.384 1.112.38 1.828v5.713h-2.115v-5.385c0-.6-.155-1.07-.467-1.408-.308-.339-.734-.508-1.28-.508-.37 0-.698.081-.986.245a1.7 1.7 0 00-.672.695c-.16.304-.24.672-.24 1.104zm11.552 5.432c-.9 0-1.676-.187-2.33-.56a3.797 3.797 0 01-1.501-1.6c-.35-.694-.526-1.51-.526-2.448 0-.923.175-1.733.526-2.43.354-.701.849-1.246 1.483-1.636.635-.393 1.38-.59 2.237-.59.553 0 1.075.09 1.566.269.495.175.93.448 1.308.818.382.37.682.84.9 1.413.218.569.327 1.246.327 2.033v.648h-6.25c.007.5.102.93.286 1.291.191.37.458.654.8.853.343.195.744.292 1.204.292.307 0 .586-.043.835-.128.25-.09.465-.22.648-.392a1.63 1.63 0 00.415-.636l1.974.222a3.077 3.077 0 01-.712 1.366c-.347.386-.79.686-1.332.9-.541.21-1.16.315-1.858.315zm-1.986-6.483c-.16.298-.25.624-.27.975h4.22a2.275 2.275 0 00-.264-1.08 1.91 1.91 0 00-.718-.754 2.02 2.02 0 00-1.063-.275 2.06 2.06 0 00-1.14.316 2.173 2.173 0 00-.764.818zM56.54 4.88v11.963h-2.115V4.88h2.115zm-3.747 4.627V7.87h-1.77v-2.15h-2.115v2.15h-1.273v1.636h1.273v4.988c-.003.56.117 1.028.363 1.402.249.374.586.65 1.01.83.425.174.902.254 1.431.239.3-.008.553-.035.76-.082.21-.047.372-.09.484-.128l-.356-1.654a3.152 3.152 0 01-.257.053c-.109.02-.23.03-.362.03-.175 0-.335-.028-.48-.083a.693.693 0 01-.35-.303c-.085-.152-.128-.37-.128-.654V9.507h1.77zm-8.44 3.563V7.87h2.114v8.972h-2.05v-1.595h-.093a2.698 2.698 0 01-1 1.233c-.459.32-1.026.479-1.7.479-.587 0-1.107-.13-1.559-.391a2.72 2.72 0 01-1.051-1.151c-.253-.506-.38-1.118-.38-1.834V7.87h2.115v5.386c0 .568.155 1.02.467 1.355.311.335.72.502 1.227.502.311 0 .613-.076.905-.228.292-.151.532-.377.718-.677.191-.304.287-.684.287-1.14zm-8.07 1.104c.483-.92.725-2.023.725-3.312 0-1.29-.242-2.391-.725-3.306-.479-.92-1.133-1.622-1.962-2.11-.826-.486-1.762-.73-2.81-.73-1.047 0-1.986.244-2.815.73-.826.488-1.48 1.19-1.963 2.11-.479.915-.718 2.017-.718 3.306 0 1.285.239 2.387.718 3.306.483.915 1.137 1.618 1.963 2.109.83.486 1.768.73 2.815.73 1.048 0 1.984-.244 2.81-.73.83-.487 1.483-1.188 1.962-2.103zm-1.88-5.608c.284.623.426 1.388.426 2.296 0 .907-.142 1.674-.427 2.301-.28.623-.67 1.096-1.168 1.42-.498.319-1.073.479-1.723.479-.65 0-1.225-.16-1.723-.48-.498-.323-.89-.796-1.174-1.419-.28-.627-.42-1.394-.42-2.301 0-.908.14-1.673.42-2.296.284-.627.675-1.1 1.174-1.42.498-.322 1.073-.484 1.723-.484.65 0 1.225.162 1.723.485.499.319.888.792 1.169 1.42z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}

function LogoDefault() {
  const [theme] = useTheme()
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="104"
      height="29"
      fill="none"
      viewBox="0 0 104 29"
    >
      <path
        fill={theme === 'light' ? '#000' : '#FFF'}
        fillRule="evenodd"
        d="M13.982 28.237c7.721 0 13.981-6.26 13.981-13.982 0-7.722-6.26-13.981-13.981-13.981C6.26.274 0 6.534 0 14.255c0 7.722 6.26 13.982 13.982 13.982zm1.017-18.67c.266.135.516.313.739.536l2.443 2.443a2.893 2.893 0 010 4.09l-2.443 2.444a2.892 2.892 0 01-.739.536c1.085.55 2.445.37 3.352-.537l2.443-2.442a2.893 2.893 0 000-4.091l-2.443-2.443A2.894 2.894 0 0015 9.567zm-6.052.45a2.893 2.893 0 014.091 0l2.443 2.443a2.893 2.893 0 010 4.09l-2.443 2.444a2.893 2.893 0 01-4.09 0L6.504 16.55a2.893 2.893 0 010-4.091l2.442-2.443zM75.9 10.506V22.17h2.748V10.506h-2.749zm.257-2.088c.314.288.689.433 1.124.433.44 0 .815-.145 1.124-.433.314-.294.47-.646.47-1.056a1.38 1.38 0 00-.47-1.055 1.571 1.571 0 00-1.124-.44c-.435 0-.81.146-1.124.44a1.38 1.38 0 00-.47 1.055c0 .41.156.762.47 1.056zm7.639 6.918v6.834h-2.749V10.506h2.627v1.982h.137a3.334 3.334 0 011.283-1.557c.593-.384 1.324-.577 2.195-.577.805 0 1.506.172 2.103.517a3.478 3.478 0 011.398 1.495c.334.654.498 1.446.493 2.377v7.427h-2.749v-7.002c0-.78-.202-1.39-.607-1.83-.4-.44-.954-.66-1.663-.66-.481 0-.909.106-1.283.319-.37.207-.661.508-.874.903-.207.395-.311.874-.311 1.435zm15.018 7.062c-1.17 0-2.18-.243-3.03-.73a4.937 4.937 0 01-1.952-2.08c-.455-.901-.683-1.962-.683-3.182 0-1.2.228-2.252.683-3.159.46-.91 1.104-1.62 1.929-2.126.825-.511 1.795-.767 2.908-.767.72 0 1.398.117 2.035.35.643.227 1.21.582 1.701 1.063.497.48.886 1.093 1.17 1.837.283.74.425 1.62.425 2.643v.843h-8.125c.008.649.132 1.208.372 1.678.248.48.595.85 1.04 1.108.446.254.967.38 1.565.38.4 0 .761-.055 1.085-.167.324-.116.605-.286.843-.509.238-.222.418-.498.54-.827l2.566.288a4.006 4.006 0 01-.926 1.777c-.451.501-1.028.891-1.732 1.17-.703.273-1.508.41-2.414.41zm-2.582-8.43a3.024 3.024 0 00-.352 1.269h5.485a2.953 2.953 0 00-.342-1.405 2.48 2.48 0 00-.934-.98c-.394-.238-.855-.357-1.382-.357-.562 0-1.055.137-1.48.41a2.825 2.825 0 00-.995 1.064zM73.5 6.619V22.17h-2.749V6.618h2.75zm-4.87 6.014v-2.126h-2.301V7.712h-2.75v2.794h-1.655v2.126h1.656v6.485c-.005.73.151 1.336.47 1.822.324.486.762.846 1.314 1.079.552.228 1.172.331 1.86.311.39-.01.72-.045.988-.106a6.15 6.15 0 00.63-.167l-.463-2.15c-.076.021-.188.044-.334.07a2.688 2.688 0 01-.471.037c-.228 0-.436-.035-.623-.106a.902.902 0 01-.455-.395c-.112-.198-.167-.481-.167-.85v-6.03h2.3zm-10.973 4.632v-6.758h2.749V22.17h-2.665v-2.073h-.122a3.507 3.507 0 01-1.298 1.602c-.598.415-1.334.623-2.21.623-.764 0-1.44-.17-2.027-.51-.583-.343-1.038-.842-1.367-1.495-.33-.658-.494-1.453-.494-2.384v-7.427h2.749v7.001c0 .74.202 1.327.607 1.762.405.435.937.653 1.595.653a2.52 2.52 0 001.177-.296c.38-.198.691-.491.934-.88.248-.396.372-.89.372-1.482zM47.167 18.7c.628-1.195.942-2.63.942-4.306 0-1.676-.314-3.108-.942-4.298-.623-1.195-1.473-2.109-2.551-2.741-1.074-.633-2.291-.95-3.653-.95s-2.582.317-3.66.95c-1.073.632-1.924 1.546-2.551 2.74-.623 1.19-.934 2.623-.934 4.299 0 1.67.31 3.103.934 4.298.627 1.19 1.478 2.103 2.551 2.741 1.078.633 2.298.95 3.66.95s2.58-.317 3.653-.95c1.078-.633 1.928-1.544 2.551-2.733zm-2.445-7.29c.37.81.554 1.804.554 2.984s-.184 2.177-.554 2.992c-.365.81-.87 1.425-1.519 1.845-.648.415-1.395.623-2.24.623-.845 0-1.592-.208-2.24-.623-.648-.42-1.157-1.035-1.526-1.845-.365-.815-.547-1.813-.547-2.992 0-1.18.182-2.174.547-2.984.37-.815.878-1.43 1.526-1.846.648-.42 1.395-.63 2.24-.63.846 0 1.592.21 2.24.63.648.416 1.154 1.03 1.519 1.846z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}

function getLogo(variant: TVariant = 'default'): () => JSX.Element {
  switch (variant) {
    case 'sm':
      return LogoSmall
    default:
      return LogoDefault
  }
}

export { getLogo }
