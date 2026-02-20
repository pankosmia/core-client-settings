import { Box, Button, FormControl, MenuItem, Select } from "@mui/material";
import { doI18n } from "pithekos-lib";
import { i18nContext } from "pankosmia-rcl";

import { useState, useEffect, useContext } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import LanguageMenuItem from "./LanguageMenuItem";

export default function LanguageSelection({ languageChoices, usedLanguages }) {
  const { i18nRef } = useContext(i18nContext)
  const [items, setItems] = useState([]);
  const [selectIsOpen, setSelectIsOpen] = useState();
  const [selectedLanguage,setSelectedLanguage] = useState("");
  console.log("langue",selectedLanguage)
  useEffect(() => {
    if (Array.isArray(languageChoices)) {
      setItems(
        languageChoices.map((lang) => ({
          id: lang,
          content: lang
        }))
      );
    }
  }, [languageChoices]);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    setItems(reorder(items, result.source.index, result.destination.index));
  };

  const grid = 8;

  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    background: isDragging ? "lightgreen" : "grey",
    ...draggableStyle
  });

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 285
  });
  const handleClick = (event) => {
    setSelectIsOpen(true);
  };
  return (
    <Box sx={{ width: 300 }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Button fullWidth onClick={handleClick} variant='outlined' color='secondary' sx={{ display: 'block', mt: 2 }}>
          {doI18n("pages:core-settings:add", i18nRef.current)}
        </Button>
        {selectIsOpen && (
          <MenuItem>
            <FormControl size="small" fullWidth>
              <Select
                value={""}
                onClose={() => setSelectIsOpen(false)}
                //onChange={setSelectedLanguage()}
              >
                {usedLanguages
                  .filter(item => !languageChoices.includes(item.id))
                  .map((language) => (
                    <MenuItem key={language.id} value={language.id} dense>
                      <LanguageMenuItem language={language} />
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </MenuItem>
        )}
      </DragDropContext>
    </Box>

  );
}