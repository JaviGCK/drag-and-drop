import './card.css';
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Character, character } from './card.data';

type Columns = {
    [key: string]: Character[];
};

const maxCharactersPerColumn = 5;
const initialCharactersPerColumn = 4;

export const Card = () => {
    const initialColumns: Columns = {
        column1: character.slice(0, initialCharactersPerColumn),
        column2: character.slice(initialCharactersPerColumn, initialCharactersPerColumn * 2),
        column3: character.slice(initialCharactersPerColumn * 2, initialCharactersPerColumn * 3),
        column4: character.slice(initialCharactersPerColumn * 3, initialCharactersPerColumn * 4),
        column5: character.slice(initialCharactersPerColumn * 4, initialCharactersPerColumn * 5)
    };

    const [columns, updateColumns] = useState<Columns>(initialColumns);

    const handleOnDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        const sourceColumn = columns[result.source.droppableId];
        const destinationColumn = columns[result.destination.droppableId];

        if (destinationColumn.length >= maxCharactersPerColumn) {
            return;
        }

        const updatedColumns: Columns = { ...columns };

        const [draggedItem] = sourceColumn.splice(result.source.index, 1);
        destinationColumn.splice(result.destination.index, 0, draggedItem);

        updateColumns(updatedColumns);
    };

    return (
        <div className="App">
            <header className="App-header">
                <img className='App-logo' src='/images/Demon-Slayer-3-1-2024.png' alt='logo' />
            </header>
            <section className="App-section">
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <div className="columns-container">
                        {Object.entries(columns).map(([columnId, column]) => (
                            <Droppable key={columnId} droppableId={columnId} type="CHARACTERS">
                                {(provided) => (
                                    <ul
                                        className="characters"
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {column.map(({ id, name, thumb }, index) => (
                                            <Draggable
                                                key={id}
                                                draggableId={`character-${id}`}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <li
                                                        key={`character-${id}`}
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <div className="characters-thumb">
                                                            <img src={thumb} alt={`${name} Thumb`} />
                                                        </div>
                                                        <p>{name}</p>
                                                    </li>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </ul>
                                )}
                            </Droppable>
                        ))}
                    </div>
                </DragDropContext>
            </section>
        </div>
    );
};
