import {MiniMaple} from "../src/miniMaple";

test('empty', () => {
    const mm = new MiniMaple();
    expect(mm.differentiate('', 'x')).toBe("0");
});

test('one variable', () => {
    const mm = new MiniMaple();
    expect(mm.differentiate("x","x")).toBe("1");
});

test('number', () => {
    const mm = new MiniMaple();
    expect(mm.differentiate("89", "x")).toBe("0");
});

test('minus', () => {
    const mm = new MiniMaple();
    expect(mm.differentiate("15-x", "x")).toBe("-1");

    expect(mm.differentiate("x-1", "x")).toBe("1");

    expect(mm.differentiate("-x", "x")).toBe("-1");
});

test('plus', () => {
    const mm = new MiniMaple();
    expect(mm.differentiate("x+9", "x")).toBe("1");

    expect(mm.differentiate("12+x", "x")).toBe("1");

    expect(mm.differentiate("+x", "x")).toBe("1");
});

test('multiply', () => {
    const mm = new MiniMaple();
    expect(mm.differentiate("12*x", "x")).toBe("12");

    expect(mm.differentiate("-9*x", "x")).toBe("-9");

    expect(mm.differentiate("0*x", "x")).toBe("0");
});

test('pow', () => {
    const mm = new MiniMaple();

    expect(mm.differentiate("x^12", "x")).toBe("12*x^11");

    expect(mm.differentiate("2*x^3", "x")).toBe("6*x^2");

    expect(mm.differentiate("x^0", "x")).toBe("0");
});

test('invalid variable', () => {
    const mm = new MiniMaple();
    expect(mm.differentiate("12*x^4+x-1", "y")).toBe("0");

    expect(mm.differentiate("12*y+2*x^2", "y")).toBe("12");

    expect(mm.differentiate("z+x", "z")).toBe("1");
});

test('several variables', () => {
    const mm = new MiniMaple();
    expect(mm.differentiate("6*x*y", "z")).toBe("0");

    expect(mm.differentiate("22*y^4*z*x", "x")).toBe("22*y^4*z");

    expect(mm.differentiate("x*z*t", "x")).toBe("1*z*t");

    expect(mm.differentiate("x^2*y*t", "x")).toBe("2*y*t*x");

    expect(mm.differentiate("x^3*z*t", "x")).toBe("3*z*t*x^2");
});

test('incorrect polynomial', () => {
    const mm = new MiniMaple();

    expect(() => mm.differentiate('-3x-6', 'x')).toThrow();

    expect(() => mm.differentiate("16*y$k", "x")).toThrow();

    expect(() => mm.differentiate("12*xx^2", "x")).toThrow();

    expect(() => mm.differentiate("3*x^^3", "x")).toThrow();

    expect(() => mm.differentiate("9*x*aa^4", "x")).toThrow();

    expect(() => mm.differentiate("12*x^x", "x")).toThrow();

    expect(() => mm.differentiate("4*x^y", "x")).toThrow();

    expect(() => mm.differentiate("4*x^*4", "x")).toThrow();

    expect(() => { mm.differentiate("2*x8^3", "x")}).toThrow();

    expect(() => { mm.differentiate("4*x^4++5", "x")}).toThrow();
});

test('incorrect variableName', () => {
    const mm = new MiniMaple();
    const expression = "2*x^2";

    expect(() => mm.differentiate(expression, "")).toThrow();

    expect(() => mm.differentiate(expression, "а")).toThrow();

    expect(() => mm.differentiate(expression, "xc")).toThrow();

    expect(() =>mm.differentiate(expression, "7")).toThrow();

    expect(() => mm.differentiate(expression, "X")).toThrow();
});

test('all operations', () => {
    const mm = new MiniMaple();
    expect(mm.differentiate("-x^5+2*x^3-x+12-6*x-1+22*x", "x")).toBe("-5*x^4+6*x^2-1-6+22");

    expect(mm.differentiate("-2*y^5*x+12*x^2*r-3*y*x^3*z*h-7*y", "x")).toBe("-2*y^5+24*r*x-9*y*z*h*x^2");

});

test('interesting situations', () => {
    const mm = new MiniMaple();
    expect(mm.differentiate('-x', 'x')).toBe('-1');
  
    expect(mm.differentiate('2*x-x', 'x')).toBe('2-1');
  
    expect(mm.differentiate('3*x-4*x', 'x')).toBe('3-4');
  
    expect(mm.differentiate('-4', 'x')).toBe('0');
  
    expect(mm.differentiate('-x+1', 'x')).toBe('-1');  
});
