import { Box, FormControl, FormHelperText, IconButton, List, ListItem, ListItemText, MenuItem, Select, Tooltip } from "@mui/material";
import { doI18n, postEmptyJson } from "pithekos-lib";
import { i18nContext } from "pankosmia-rcl";
import { useState, useEffect, useContext } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import LanguageMenuItem from "./LanguageMenuItem";
import { DragIndicator } from "@mui/icons-material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function LanguageSelection({ languageChoices, usedLanguages, setLanguageChoices }) {
  const { i18nRef } = useContext(i18nContext)
  const [items, setItems] = useState([]);
  const enIndex = items.findIndex(item => item.id === "en");

  useEffect(() => {
    const newItems = languageChoices?.map(choice => {
      const language = usedLanguages.find(lang => lang.id === choice);
      return { id: choice, content: language?.endonym };
    });
    setItems(newItems);
  }, [languageChoices, usedLanguages]);

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
      postEmptyJson(`/settings/languages/${languageString}`).then();
      return updated;
    });
  }
  const removeLanguage = (langId) => {
    setLanguageChoices((prev) => {
      let updated = prev.filter(id => id !== langId);
      const languageString = updated.join("/");
      postEmptyJson(`/settings/languages/${languageString}`);
      return updated;
    });
  };
  return (
    <Box sx={{ width: 300 }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <List
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <ListItem
                      secondaryAction={
                        <IconButton disabled={item.id === "en"} edge="end" aria-label="delete" onClick={() => removeLanguage(item.id)}>
                          <DeleteOutlineIcon />
                        </IconButton>
                      }
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      sx={{
                        transition: "background-color 0.2s ease",
                        "&:hover": {
                          backgroundColor: "grey.100",
                        },
                        "&:active": {
                          backgroundColor: "grey.300",
                        },
                        ...(snapshot.isDragging && {
                          backgroundColor: "grey.300",
                        }),
                      }}
                    >
                      <IconButton {...provided.dragHandleProps} size="small" sx={{ cursor: "grab" }}>
                        <DragIndicator />
                      </IconButton>
                      <Tooltip title={item.id === "en" && `${doI18n("pages:core-settings:tooltip_en", i18nRef.current)}`}>
                        <Tooltip title={index > enIndex && `${doI18n("pages:core-settings:tooltip_languages", i18nRef.current)}`}>
                          <ListItemText
                            style={{
                              color: index > enIndex ? "gray" : "black"
                            }}
                          > {item.id} {item.content}
                          </ListItemText>
                        </Tooltip>
                      </Tooltip>
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
            onChange={(ev) => { doChange(ev.target.value) }}
            value={''}
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
          <FormHelperText>{doI18n("pages:core-settings:add_language", i18nRef.current)}</FormHelperText>
        </FormControl>
      </DragDropContext>
    </Box>

  );
}