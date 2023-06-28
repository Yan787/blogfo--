import React from "react";

import {mapItems} from "../functions"
import {divide} from "../functions"

describe("Test for functions-helpers", ()=> {
    test("Exact Value mapping", ()=> {
        const arr = [{name: "Name", id: 10}]
        const result = [{value: "Name", key: 10}]
        expect(arr.map(mapItems)).toEqual(result)
    })
})

describe("divide func testing", ()=> {
    test("Right result", ()=> {
        expect(divide(9, 3)).toBe(3)
    })
    test("is Infinity", ()=> {
        expect(divide(9, 0)).toBe(Infinity)
    })
})