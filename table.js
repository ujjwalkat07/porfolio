import { createTable, getCoreRowModel, flexRender } from '@tanstack/table-core'

const data = [{ id: 1, name: 'Ada' }]
const columns = [{ accessorKey: 'name', header: 'Name' }]

const table = createTable({ data, columns, getCoreRowModel: getCoreRowModel() })

const thead = document.querySelector('thead')
if (thead) {
  table.getHeaderGroups().forEach((hg) => {
    const tr = document.createElement('tr')
    hg.headers.forEach((header) => {
      const th = document.createElement('th')
      th.textContent = String(flexRender(header.column.columnDef.header, header.getContext()))
      tr.appendChild(th)
    })
    thead.appendChild(tr)
  })
}

const tbody = document.querySelector('tbody')
table.getRowModel().rows.forEach((row) => {
  const tr = document.createElement('tr')
  row.getVisibleCells().forEach((cell) => {
    const td = document.createElement('td')
    td.textContent = String(flexRender(cell.column.columnDef.cell, cell.getContext()))
    tr.appendChild(td)
  })
  tbody.appendChild(tr)
})