<p align="center">
  <a href="https://github.com/acgotaku/japan-mapcode" target="_blank" rel="noopener noreferrer">
    <img width="180" src="./public/mapdoge.svg" alt="Map Doge logo">
  </a>
</p>

# japan-mapcode

## Development Environment

### Setup Requirements

- Install [Pnpm](https://pnpm.io/installation)

### Dev mode

```bash
pnpm i
pnpm dev
```

Open `chrome://extensions/`, enable `Developer mode`. Click `Load unpacked` button and selct `dist` folder.

### Build

```bash
pnpm build
```

## Usage

Open [Google Maps](https://www.google.com/maps), select any palace and confirm URL contains GPS info `@xx.xxx,yy.yyyyy,15z`.

Click the extension icon, we will fill the GPS info. Of course you can input GPS info manually.

Click `Get` button you will get the MAPCODE.

**Only Japan GPS info is valid.**

## Icons

[Phosphor Icons](https://phosphoricons.com/)

## License

MIT
