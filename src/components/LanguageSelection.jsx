import { Box, FormControl, IconButton, List, ListItem, ListItemText, MenuItem, Select } from "@mui/material";
import { doI18n, postEmptyJson } from "pithekos-lib";
import { i18nContext } from "pankosmia-rcl";

import { useState, useEffect, useContext } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import LanguageMenuItem from "./LanguageMenuItem";
import { DragIndicator } from "@mui/icons-material";

export default function LanguageSelection({ languageChoices, usedLanguages, setLanguageChoices }) {
  const { i18nRef } = useContext(i18nContext)
  const [items, setItems] = useState([]);
  const [selectIsOpen, setSelectIsOpen] = useState();
  const [selectedLanguage, setSelectedLanguage] = useState("");

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

    const reorderedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(reorderedItems);

    const newOrder = reorderedItems.map(item => item.id);

    setLanguageChoices(newOrder);

    const languageString = newOrder.join("/");
    postEmptyJson(`/settings/languages/${languageString}`);
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

  const doChange = (selected) => {
    setLanguageChoices((prev) => {
      let updated = [...prev];

      if (!updated.includes(selected)) {
        updated.push(selected);
      }
      if (!updated.includes("en")) {
        updated.push("en");
      }

      const languageString = updated.join("/");
      postEmptyJson(`/settings/languages/${languageString}`);

      return updated;
    });

    setSelectedLanguage("");
  }
  return (
    <Box sx={{ width: 300 }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <List
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <ListItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                      >
                      <IconButton {...provided.dragHandleProps} size="small" sx={{cursor:"grab"}}>
                        <DragIndicator/>
                      </IconButton>
                      <ListItemText primary={item.content}/>
                    </ListItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
        <FormControl size="small" fullWidth>

          <Select
            label={doI18n("pages:core-settings:add", i18nRef.current)}
            value={selectedLanguage || ""}
            onClose={() => setSelectIsOpen(false)}
            onChange={(ev) => {doChange(ev.target.value)}}>
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
      </DragDropContext>
    </Box>

  );
}