function ev() {
    let i = 1;
    // let n = 50;4
    const n = parseInt(prompt("Enter a Num:"));

    for (i = 1; i <= n; i++) {
        if (i % 2 == 0) {
            document.write("( " + i + " ) ");
        }
    }
}
ev();