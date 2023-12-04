<div align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=PhilDanielsIO.vscode-line-number-utils">
    <img alt="Icon Logo" src="https://raw.githubusercontent.com/phildaniels/vscode-line-number-utils/main/assets/icon.png" width="110">
  </a>
  <div style="font-size: 25px" align="center">VSCode Line Number Utils</div>
  <br/>
  <!-- marketplace version -->
  <a href="https://marketplace.visualstudio.com/items?itemName=PhilDanielsIO.vscode-line-number-utils">
    <img alt="marketplace version" src="https://img.shields.io/visual-studio-marketplace/i/PhilDanielsIO.vscode-line-number-utils.svg?maxAge=3600&style=for-the-badge&labelColor=000000&color=957fb7">
  </a>
  &nbsp;&nbsp;
  <!-- downloads -->
  <a href="https://marketplace.visualstudio.com/items?itemName=PhilDanielsIO.vscode-line-number-utils">
    <img alt="downloads" src="https://img.shields.io/visual-studio-marketplace/d/PhilDanielsIO.vscode-line-number-utils.svg?maxAge=3600&style=for-the-badge&labelColor=000000&color=957fb7">
  </a>
  &nbsp;&nbsp;
  <!-- rating -->
  <a href="https://marketplace.visualstudio.com/items?itemName=PhilDanielsIO.vscode-line-number-utils">
    <img alt="rating" src="https://img.shields.io/visual-studio-marketplace/stars/PhilDanielsIO.vscode-line-number-utils.svg?maxAge=3600&style=for-the-badge&labelColor=000000&color=957fb7">
  </a>
  <br/>
  <div align="center" style="max-width: 50%;">

Utilities for inserting and copying line numbers during single and multi-cursor editing. Similar utility to extensions like "Turbo Console Log" but more general and works for general editing

  </div>
</div>

<br />

<div align="left">
Currently there are four commands:

1. **Line Number Utils: Copy Line Number(s) at Cursor(s) to Clipboard**: Mapped to `ctrl+shift+alt+c`. Will take the line number at the cursor(s) and copy to the system clipboard

2. **Line Number Utils: Insert Line Number(s) at Cursor(s)**: Mapped to `ctrl+shift+alt+i`. Will take the line number at the cursor(s) insert the corresponding number(s) at the cursor(s)
</div>
<br/>
<div align="center" style="max-width: 75%; margin-left: auto; margin-right: auto;">
  <img
    src="https://raw.githubusercontent.com/phildaniels/vscode-line-number-utils/main/assets/showcase.gif"
    role="presentation"
    alt="Showcase of extension commands 1 and 2"
  />
</div>
<div align="left">

3. **Line Number Utils: Insert Sequential Number(s) at Cursor(s)**: Mapped to `ctrl+shift+alt+q`. Will open two input boxes, a box to accept a starting number, and a step, and increment from there. IE If step is start is 3, step is 2, and there are 4 cursors, will insert 3, 5, 7, 9 respectively at each cursor

4. **Line Number Utils: Insert Default Sequential Number(s) at Cursor(s)**: Mapped to `ctrl+shift+alt+d`. The same as command 3. but without prompts. Will automatically start at 0 and increment by 1.
</div>
<br/>
<div align="center" style="max-width: 75%; margin-left: auto; margin-right: auto;">
  <img
    src="https://raw.githubusercontent.com/phildaniels/vscode-line-number-utils/main/assets/showcaseV2.gif"
    role="presentation"
    alt="Showcase of extension commands 3 and 4"
  />
</div>

</div>

## License

[MIT License](https://github.com/phildaniels/vscode-line-number-utils/blob/main/LICENSE)
