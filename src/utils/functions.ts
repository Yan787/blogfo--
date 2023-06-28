import React from "react"

type Item = {
    id: number,
    name: string,
}

export const mapItems = (item: Item) => {
    return {
        key: item.id,
        value: item.name,
    }
}

export const divide = (a: number, b: number) => {
    return a / b
}